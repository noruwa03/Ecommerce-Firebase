import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "@/models/authState.type";
import { UserInput } from "@/models/userInput.type";
import { auth, storage, firestore } from "@/lib/firebase";
import { RootState, persistor } from "@/store";
import { PURGE } from "redux-persist";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const initialState: Auth = {
  loading: false,
  error: "",
  success: "",
  emailVerification: false,
  user: null,
};

export const signIn = createAsyncThunk(
  "signinUser/signIn",
  async (payload: UserInput) => {
    setPersistence(auth, browserLocalPersistence);
    const promise = signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    ).then(async (res) => {
      const currentUser = [];
      const docRef = doc(firestore, "users", res.user.uid);
      const user = await getDoc(docRef);

      currentUser.push({ ...user.data() });

      const userObj = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: currentUser[0].displayName,
        photoName: currentUser[0].photoName,
        photoURL: currentUser[0].photoURL,
        vendor: currentUser[0].vendor,
        storeName: currentUser[0].storeName,
        storeInfo: currentUser[0].storeInfo,
        storeBGPhotoName: currentUser[0].storeBGPhotoName,
        storeBGPhotoURL: currentUser[0].storeBGPhotoURL,
      };

      return userObj;
    });

    return promise;
  }
);

export const signUp = createAsyncThunk(
  "signupUser/signUp",
  (payload: UserInput) => {
    setPersistence(auth, browserLocalPersistence);
    const promise = createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    ).then(async (res) => {
      const result = sendEmailVerification(res.user).then(async () => {
        await setDoc(doc(firestore, "users", res.user.uid), {
          email: payload.email,
          displayName: "",
          photoName: "",
          photoURL: "",
          vendor: false,
          storeName: "",
          storeInfo: "",
          storeBGPhotoName: "",
          storeBGPhotoURL: "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        const userObj = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: "",
          photoName: "",
          photoURL: "",
          vendor: false,
          storeName: "",
          storeInfo: "",
          storeBGPhotoName: "",
          storeBGPhotoURL: "",
        };

        return userObj;
      });
      return result;
    });

    return promise;
  }
);

export const signOutCurrentUser = () => {
  signOut(auth).then(() => {
    window.location.href = "/";
    persistor.purge();
  });
};

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile/updateProfile",
  async (payload: any, api) => {
    const appState = api.getState() as RootState;

    if (auth.currentUser) {
      if (payload.imageFile) {
        if (appState.auth.user.photoURL.length === 0) {
          const updateRef = ref(
            storage,
            `documents/profile_image/${payload.imageFile.name}`
          );

          const uploadTask = uploadBytesResumable(updateRef, payload.imageFile);
          await uploadTask;
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

          const docRef = doc(firestore, "users", appState.auth.user.uid);

          const updateResult = updateDoc(docRef, {
            displayName: payload.fullname,
            photoName: payload.imageFile.name,
            photoURL: imageURL,
            updatedAt: serverTimestamp(),
          }).then(() => {
            const userDetail = {
              userDisplayName: payload.fullname,
              photoName: payload.imageFile.name,
              userPhotoURL: imageURL,
            };
            return userDetail;
          });

          return updateResult;
        } else {
          const storageRef = ref(
            storage,
            `documents/profile_image/${appState.auth.user.photoName}`
          );

          const delResult = deleteObject(storageRef).then(async () => {
            // File deleted successfully

            const updateRef = ref(
              storage,
              `documents/profile_image/${payload.imageFile.name}`
            );

            const uploadTask = uploadBytesResumable(
              updateRef,
              payload.imageFile
            );
            await uploadTask;
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

            const docRef = doc(firestore, "users", appState.auth.user.uid);

            const updateResult = updateDoc(docRef, {
              displayName: payload.fullname,
              photoName: payload.imageFile.name,
              photoURL: imageURL,
              updatedAt: serverTimestamp(),
            }).then(() => {
              const userDetail = {
                userDisplayName: payload.fullname,
                photoName: payload.imageFile.name,
                userPhotoURL: imageURL,
              };
              return userDetail;
            });

            return updateResult;
          });

          return delResult;
        }
      } else {
        const docRef = doc(firestore, "users", appState.auth.user.uid);

        const updateResult = updateDoc(docRef, {
          displayName: payload.fullname,
          updatedAt: serverTimestamp(),
        }).then(() => {
          const userDetail = {
            userDisplayName: payload.fullname,
            photoName: appState.auth.user.photoName,
            userPhotoURL: appState.auth.user.photoURL,
          };
          return userDetail;
        });

        return updateResult;
      }
    }
  }
);

export const updateStoreDetail = createAsyncThunk(
  "updateStoreDetail/storeDetail",
  async (payload: any, api) => {
    const appState = api.getState() as RootState;

    if (auth.currentUser) {
      if (payload.imageFile) {
        if (appState.auth.user.storeBGPhotoURL.length === 0) {
          const updateRef = ref(
            storage,
            `documents/store_image/${payload.imageFile.name}`
          );

          const uploadTask = uploadBytesResumable(updateRef, payload.imageFile);
          await uploadTask;
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

          const docRef = doc(firestore, "users", appState.auth.user.uid);

          const updateResult = updateDoc(docRef, {
            storeName: payload.store.storeName,
            storeInfo: payload.store.storeInfo,
            storeBGPhotoName: payload.imageFile.name,
            storeBGPhotoURL: imageURL,
            updatedAt: serverTimestamp(),
          }).then(() => {
            const resultDetail = {
              storeName: payload.store.storeName,
              storeInfo: payload.store.storeInfo,
              storeBGPhotoName: payload.imageFile.name,
              storeBGPhotoURL: imageURL,
            };
            return resultDetail;
          });

          return updateResult;
        } else {
          const storageRef = ref(
            storage,
            `documents/store_image/${appState.auth.user.storeBGPhotoName}`
          );

          const delResult = deleteObject(storageRef).then(async () => {
            // File deleted successfully

            const updateRef = ref(
              storage,
              `documents/store_image/${payload.imageFile.name}`
            );

            const uploadTask = uploadBytesResumable(
              updateRef,
              payload.imageFile
            );
            await uploadTask;
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

            const docRef = doc(firestore, "users", appState.auth.user.uid);

            const updateResult = updateDoc(docRef, {
              storeName: payload.store.storeName,
              storeInfo: payload.store.storeInfo,
              storeBGPhotoName: payload.imageFile.name,
              storeBGPhotoURL: imageURL,
              updatedAt: serverTimestamp(),
            }).then(() => {
              const resultDetail = {
                storeName: payload.store.storeName,
                storeInfo: payload.store.storeInfo,
                storeBGPhotoName: payload.imageFile.name,
                storeBGPhotoURL: imageURL,
              };
              return resultDetail;
            });

            return updateResult;
          });

          return delResult;
        }
      } else {
        const docRef = doc(firestore, "users", appState.auth.user.uid);

        const updateResult = updateDoc(docRef, {
          storeName: payload.store.storeName,
          storeInfo: payload.store.storeInfo,
          updatedAt: serverTimestamp(),
        }).then(() => {
          const resultDetail = {
            storeName: payload.store.storeName,
            storeInfo: payload.store.storeInfo,
            storeBGPhotoName: appState.auth.user.storeBGPhotoName,
            storeBGPhotoURL: appState.auth.user.storeBGPhotoURL,
          };
          return resultDetail;
        });

        return updateResult;
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    closeModal(state) {
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    // Signup

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(signUp.rejected, (state) => {
        (state.loading = false), (state.error = "An error has occured");
      }),
      builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.emailVerification = true;
        state.user = action.payload;
      });

    //Signin
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(signIn.rejected, (state) => {
        (state.loading = false), (state.error = "An error has occured");
      }),
      builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      });

    //SignOut
    builder.addCase(PURGE, (state) => {
      state.user = null;
    });

    // Update Profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(updateUserProfile.rejected, (state) => {
        (state.loading = false), (state.error = "An error has occured");
      }),
      builder.addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

          state.user.displayName = action.payload.userDisplayName;
          state.user.photoName = action.payload.photoName;
          state.user.photoURL = action.payload.userPhotoURL;
          state.success = "Your profile has been updated successfully.";
        }
      );

    // Update Store Info
    builder.addCase(updateStoreDetail.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(updateStoreDetail.rejected, (state) => {
        (state.loading = false), (state.error = "An error has occured");
      }),
      builder.addCase(
        updateStoreDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

          state.user.storeName = action.payload.storeName;
          state.user.storeInfo = action.payload.storeInfo;
          state.user.storeBGPhotoName = action.payload.storeBGPhotoName;
          state.user.storeBGPhotoURL = action.payload.storeBGPhotoURL;
          state.success = "Your store profile has been updated successfully.";
        }
      );
  },
});

export default authSlice.reducer;
export const { closeModal } = authSlice.actions;
