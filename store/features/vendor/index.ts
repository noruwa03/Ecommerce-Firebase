import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { storage, firestore } from "@/lib/firebase";
import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

interface IVENDOR {
  loading: boolean;
  success: string;
  delete_image_success?: string;
  error: string;
  product: any;
  singleProduct: any;
  dashboardProduct: any;
}

const initialState: IVENDOR = {
  loading: false,
  success: "",
  delete_image_success: "",
  error: "",
  product: [],
  singleProduct: [],
  dashboardProduct: [],
};

export const getDashboardProduct = createAsyncThunk(
  "getDashboardProduct/fetchVendorProduct",
  async (_, { getState }) => {
    const appState = getState() as RootState;

    const productRef = collection(firestore, "product");
    const productQuery = query(
      productRef,
      where("uid", "==", appState.auth.user.uid)
    );

    const getVendorProduct = getDocs(productQuery).then((docRes) => {
      if (docRes.empty) {
        return [];
      } else {
        const result: any = [];
        docRes.forEach((docData) => {
          result.push({ ...docData.data(), id: docData.id });
        });

        return result;
      }
    });

    return getVendorProduct;
  }
);

export const storeProduct = createAsyncThunk(
  "storeProduct/uploadProduct",
  async (payload: any, api) => {
    const appState = api.getState() as RootState;
    const imagePath: any = [];

    await payload.productImages.map(async (img: any) => {
      const updateRef = ref(storage, `documents/product_image/${img.name}`);

      const uploadTask = uploadBytesResumable(updateRef, img);
      await uploadTask;
      const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
      imagePath.push({ imageName: img.name, imageURL: imageURL });
    });

    if (payload.coverImage) {
      const updateRef = ref(
        storage,
        `documents/product_cover_image/${payload.coverImage.name}`
      );

      const uploadTask = uploadBytesResumable(updateRef, payload.coverImage);
      await uploadTask;
      const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

      return new Promise(function (resolve) {
        setTimeout(resolve, 8000);
      }).then(async () => {
        await addDoc(collection(firestore, "product"), {
          product_name: payload.productInfo.product_name,
          price: payload.productInfo.price,
          quantity: payload.productInfo.quantity,
          category: payload.productInfo.category,
          sku: payload.productInfo.sku,
          description: payload.productInfo.description,
          coverImageName: payload.coverImage.name,
          photoURL: imageURL,
          uid: payload.currentUserId,
          multipleURL: imagePath,
          phone_no: appState.auth.user.phone_no
            ? appState.auth.user.phone_no
            : "",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        return "";
      });
    } else {
      return new Promise(function (resolve) {
        setTimeout(resolve, 8000);
      }).then(async () => {
        await addDoc(collection(firestore, "product"), {
          product_name: payload.productInfo.product_name,
          price: payload.productInfo.price,
          quantity: payload.productInfo.quantity,
          category: payload.productInfo.category,
          sku: payload.productInfo.sku,
          description: payload.productInfo.description,
          coverImageName: "",
          photoURL: "",
          uid: payload.currentUserId,
          multipleURL: imagePath,
          phone_no: appState.auth.user.phone_no
            ? appState.auth.user.phone_no
            : "",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        return "";
      });
    }
  }
);

export const getProduct = createAsyncThunk(
  "getProduct/fetchProduct",
  async () => {
    const colRef = collection(firestore, "product");

    const q = query(colRef, orderBy("createdAt", "desc"));

    const result = await getDocs(q);

    if (result.empty) {
      const content: any = [];
      return content;
    } else {
      const content: any = [];
      result.docs.forEach((doc) => {
        content.push({ ...doc.data(), id: doc.id });
      });
      return content;
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "getSingleProduct/fetchSingleProduct",
  async (payload: string | any) => {
    const docRef = doc(firestore, "product", payload);

    const result = await getDoc(docRef);

    if (result.exists()) {
      const content: any = [];
      content.push({ ...result.data(), id: result.id });
      return content;
    } else {
      return "No product";
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct/updateFirebaseProduct",
  async (payload: any, api) => {
    const appState = api.getState() as RootState;
    if (payload.newCoverImageFile) {
      if (payload.oldCoverImageName.length === 0) {
        if (payload.productImages) {
          const imagePath: any = [];

          const oldArr = payload.multipleURL;

          await payload.productImages.map(async (img: any) => {
            const updateRef = ref(
              storage,
              `documents/product_image/${img.name}`
            );

            const uploadTask = uploadBytesResumable(updateRef, img);
            await uploadTask;
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
            imagePath.push({ imageName: img.name, imageURL: imageURL });
          });

          return new Promise(function (resolve) {
            setTimeout(resolve, 8000);
          }).then(async () => {
            const newImagePath = [...oldArr, ...imagePath];

            const updateRef = ref(
              storage,
              `documents/product_cover_image/${payload.newCoverImageFile.name}`
            );

            const uploadTask = uploadBytesResumable(
              updateRef,
              payload.newCoverImageFile
            );
            await uploadTask;
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

            const docRef = doc(firestore, "product", payload.id);

            const result = await updateDoc(docRef, {
              product_name: payload.productInfo.product_name,
              price: payload.productInfo.price,
              quantity: payload.productInfo.quantity,
              category: payload.productInfo.category,
              description: payload.productInfo.description,

              coverImageName: payload.newCoverImageFile.name,
              photoURL: imageURL,

              multipleURL: newImagePath,
              phone_no: appState.auth.user.phone_no
                ? appState.auth.user.phone_no
                : "",

              updatedAt: Date.now(),
            });

            return result;
          });
        } else {
          const updateRef = ref(
            storage,
            `documents/product_cover_image/${payload.newCoverImageFile.name}`
          );

          const uploadTask = uploadBytesResumable(
            updateRef,
            payload.newCoverImageFile
          );
          await uploadTask;
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

          const docRef = doc(firestore, "product", payload.id);

          const result = await updateDoc(docRef, {
            product_name: payload.productInfo.product_name,
            price: payload.productInfo.price,
            quantity: payload.productInfo.quantity,
            category: payload.productInfo.category,
            description: payload.productInfo.description,
            coverImageName: payload.newCoverImageFile.name,
            photoURL: imageURL,
            phone_no: appState.auth.user.phone_no
              ? appState.auth.user.phone_no
              : "",
            updatedAt: Date.now(),
          });

          return result;
        }
      } else {
        if (payload.productImages) {
          const imagePath: any = [];

          const oldArr = payload.multipleURL;

          await payload.productImages.map(async (img: any) => {
            const updateRef = ref(
              storage,
              `documents/product_image/${img.name}`
            );

            const uploadTask = uploadBytesResumable(updateRef, img);
            await uploadTask;
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
            imagePath.push({ imageName: img.name, imageURL: imageURL });
          });

          const storageRef = ref(
            storage,
            `documents/product_cover_image/${payload.oldCoverImageName}`
          );

          const result = deleteObject(storageRef).then(async () => {
            const updateRef = ref(
              storage,
              `documents/product_cover_image/${payload.newCoverImageFile.name}`
            );

            const uploadTask = uploadBytesResumable(
              updateRef,
              payload.newCoverImageFile
            );
            await uploadTask;
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

            const docRef = doc(firestore, "product", payload.id);

            const newImagePath = [...oldArr, ...imagePath];

            const result = await updateDoc(docRef, {
              product_name: payload.productInfo.product_name,
              price: payload.productInfo.price,
              quantity: payload.productInfo.quantity,
              category: payload.productInfo.category,
              description: payload.productInfo.description,
              coverImageName: payload.newCoverImageFile.name,
              photoURL: imageURL,

              multipleURL: newImagePath,
              phone_no: appState.auth.user.phone_no
                ? appState.auth.user.phone_no
                : "",
              updatedAt: Date.now(),
            });

            return result;
          });

          return result;
        } else {
          const storageRef = ref(
            storage,
            `documents/product_cover_image/${payload.oldCoverImageName}`
          );

          const result = deleteObject(storageRef).then(async () => {
            const updateRef = ref(
              storage,
              `documents/product_cover_image/${payload.newCoverImageFile.name}`
            );

            const uploadTask = uploadBytesResumable(
              updateRef,
              payload.newCoverImageFile
            );
            await uploadTask;
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

            const docRef = doc(firestore, "product", payload.id);

            const result = await updateDoc(docRef, {
              product_name: payload.productInfo.product_name,
              price: payload.productInfo.price,
              quantity: payload.productInfo.quantity,
              category: payload.productInfo.category,
              description: payload.productInfo.description,
              coverImageName: payload.newCoverImageFile.name,
              photoURL: imageURL,
              phone_no: appState.auth.user.phone_no
                ? appState.auth.user.phone_no
                : "",
              updatedAt: Date.now(),
            });

            return result;
          });

          return result;
        }
      }
    } else {
      if (payload.productImages) {
        const imagePath: any = [];

        const oldArr = payload.multipleURL;

        await payload.productImages.map(async (img: any) => {
          const updateRef = ref(storage, `documents/product_image/${img.name}`);

          const uploadTask = uploadBytesResumable(updateRef, img);
          await uploadTask;
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
          imagePath.push({ imageName: img.name, imageURL: imageURL });
        });

        return new Promise(function (resolve) {
          setTimeout(resolve, 8000);
        }).then(() => {
          const newImagePath = [...oldArr, ...imagePath];

          const docRef = doc(firestore, "product", payload.id);

          const result = updateDoc(docRef, {
            product_name: payload.productInfo.product_name,
            price: payload.productInfo.price,
            quantity: payload.productInfo.quantity,
            category: payload.productInfo.category,
            description: payload.productInfo.description,
            phone_no: appState.auth.user.phone_no
              ? appState.auth.user.phone_no
              : "",
            multipleURL: newImagePath,
            updatedAt: Date.now(),
          });

          return result;
        });
      } else {
        const docRef = doc(firestore, "product", payload.id);

        const result = await updateDoc(docRef, {
          product_name: payload.productInfo.product_name,
          price: payload.productInfo.price,
          quantity: payload.productInfo.quantity,
          category: payload.productInfo.category,
          description: payload.productInfo.description,
          phone_no: appState.auth.user.phone_no
            ? appState.auth.user.phone_no
            : "",
          updatedAt: Date.now(),
        });

        return result;
      }
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "deleteProductImage/deleteImageFromFirebase",
  async (payload: any) => {
    const newImagePath = payload.multipleURL.filter(
      (res: any) => res.imageName !== payload.delRef.imageName
    );

    const storageRef = ref(
      storage,
      `documents/product_image/${payload.delRef.imageName}`
    );

    const del = deleteObject(storageRef).then(async () => {
      // File deleted successfully

      const docRef = doc(firestore, "product", payload.id);

      await updateDoc(docRef, {
        multipleURL: newImagePath,
        updatedAt: Date.now(),
      });
    });

    return del;
  }
);

export const removeProductFromDB = createAsyncThunk(
  "removeProductFromDB/removeProduct",
  async (payload: any) => {
    if (payload.coverImageName) {
      const storageRef = ref(
        storage,
        `documents/product_cover_image/${payload.coverImageName}`
      );

      deleteObject(storageRef);

      await payload.multipleURL.map(async (img: any) => {
        const storageRef = ref(
          storage,
          `documents/product_image/${img.imageName}`
        );

        deleteObject(storageRef);
      });

      const docRef = doc(firestore, "product", payload.id);
      await deleteDoc(docRef);
      return "";
    } else {
      await payload.multipleURL.map(async (img: any) => {
        const storageRef = ref(
          storage,
          `documents/product_image/${img.imageName}`
        );

        deleteObject(storageRef);
      });

      const docRef = doc(firestore, "product", payload.id);
      await deleteDoc(docRef);
      return "";
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    closeModal(state) {
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    //Create Product
    builder.addCase(storeProduct.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(storeProduct.rejected, (state) => {
        state.loading = false;
        state.error = "An error occured";
      }),
      builder.addCase(storeProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = "Product created successfully";
      }),
      //Update Product
      builder.addCase(updateProduct.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(updateProduct.rejected, (state) => {
        state.loading = false;
        state.error = "An error occured";
      }),
      builder.addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = "Product updated successfully";
      }),
      // Delete Product Image
      builder.addCase(deleteProductImage.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(deleteProductImage.rejected, (state) => {
        state.loading = false;
        state.error = "An error occured";
      }),
      builder.addCase(deleteProductImage.fulfilled, (state) => {
        state.loading = false;
        state.delete_image_success = "Product image deleted successfully";
      }),
      //Get All Product
      builder.addCase(getProduct.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(getProduct.rejected, (state) => {
        state.loading = false;
        state.error = "An error occured";
      }),
      builder.addCase(
        getProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.product = action.payload;
          state.loading = false;
        }
      ),
      //Get Vendor Product
      builder.addCase(getDashboardProduct.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(getDashboardProduct.rejected, (state) => {
        state.loading = false;
        state.error = "An error occured";
      }),
      builder.addCase(
        getDashboardProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.dashboardProduct = action.payload;
          state.loading = false;
        }
      ),
      // Remove Product
      builder.addCase(removeProductFromDB.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(removeProductFromDB.rejected, (state) => {
        state.loading = false;
        state.error = "An error occured";
      }),
      builder.addCase(removeProductFromDB.fulfilled, (state) => {
        state.loading = false;
        state.delete_image_success = "Product deleted successfully";
      }),
      //Get Single Product
      builder.addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(
        getSingleProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.singleProduct = action.payload;
          state.loading = false;
        }
      );
  },
});

export default vendorSlice.reducer;
export const { closeModal } = vendorSlice.actions;
