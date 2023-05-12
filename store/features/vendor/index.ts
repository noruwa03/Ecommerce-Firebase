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
  deleteDoc
} from "firebase/firestore";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  uploadBytes,
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
  dashboardProduct: []
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
  async (payload: any) => {
    const imagePath: any = [];

    await payload.productImages.map(async (img: any) => {
      const updateRef = ref(storage, `documents/product_image/${img.name}`);

      const uploadTask = uploadBytesResumable(updateRef, img);
      await uploadTask;
      const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
      imagePath.push({ imageName: img.name, imageURL: imageURL });
    });

    if (payload.coverImage) {
      //   console.log(payload.productInfo);
      //   console.log(payload.currentUserId);

      const updateRef = ref(
        storage,
        `documents/product_cover_image/${payload.coverImage.name}`
      );

      const uploadTask = uploadBytesResumable(updateRef, payload.coverImage);
      await uploadTask;
      const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

      //Reason for using setTimeout: addDoc function runs without getting the image array, Thus the array would be empty.
      setTimeout(async () => {
        await addDoc(collection(firestore, "product"), {
          product_name: payload.productInfo.product_name,
          price: payload.productInfo.price,
          quantity: payload.productInfo.quantity,
          category: payload.productInfo.category,
          description: payload.productInfo.description,
          coverImageName: payload.coverImage.name,
          photoURL: imageURL,
          uid: payload.currentUserId,
          multipleURL: imagePath,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }, 3000);
    } else {
      //Reason for using setTimeout: addDoc function runs without getting the image array, Thus the array would be empty.
      setTimeout(async () => {
        await addDoc(collection(firestore, "product"), {
          product_name: payload.productInfo.product_name,
          price: payload.productInfo.price,
          quantity: payload.productInfo.quantity,
          category: payload.productInfo.category,
          description: payload.productInfo.description,
          coverImageName: "",
          photoURL: "",
          uid: payload.currentUserId,
          multipleURL: imagePath,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }, 3000);
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
  async (payload: any) => {
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

          setTimeout(async () => {
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

            await updateDoc(docRef, {
              product_name: payload.productInfo.product_name,
              price: payload.productInfo.price,
              quantity: payload.productInfo.quantity,
              category: payload.productInfo.category,
              description: payload.productInfo.description,

              coverImageName: payload.newCoverImageFile.name,
              photoURL: imageURL,

              multipleURL: newImagePath,

              updatedAt: Date.now(),
            });
          }, 3000);
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

          await updateDoc(docRef, {
            product_name: payload.productInfo.product_name,
            price: payload.productInfo.price,
            quantity: payload.productInfo.quantity,
            category: payload.productInfo.category,
            description: payload.productInfo.description,
            coverImageName: payload.newCoverImageFile.name,
            photoURL: imageURL,

            // multipleURL: imagePath,
            updatedAt: Date.now(),
          });
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

          deleteObject(storageRef).then(async () => {
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

            await updateDoc(docRef, {
              product_name: payload.productInfo.product_name,
              price: payload.productInfo.price,
              quantity: payload.productInfo.quantity,
              category: payload.productInfo.category,
              description: payload.productInfo.description,
              coverImageName: payload.newCoverImageFile.name,
              photoURL: imageURL,

              multipleURL: newImagePath,
              updatedAt: Date.now(),
            });
          });
        } else {
          const storageRef = ref(
            storage,
            `documents/product_cover_image/${payload.oldCoverImageName}`
          );

          deleteObject(storageRef).then(async () => {
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

            await updateDoc(docRef, {
              product_name: payload.productInfo.product_name,
              price: payload.productInfo.price,
              quantity: payload.productInfo.quantity,
              category: payload.productInfo.category,
              description: payload.productInfo.description,
              coverImageName: payload.newCoverImageFile.name,
              photoURL: imageURL,
              updatedAt: Date.now(),
            });
          });
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

        setTimeout(async () => {
          const newImagePath = [...oldArr, ...imagePath];

          const docRef = doc(firestore, "product", payload.id);

          await updateDoc(docRef, {
            product_name: payload.productInfo.product_name,
            price: payload.productInfo.price,
            quantity: payload.productInfo.quantity,
            category: payload.productInfo.category,
            description: payload.productInfo.description,
            multipleURL: newImagePath,
            updatedAt: Date.now(),
          });
        }, 3000);
      } else {
        const docRef = doc(firestore, "product", payload.id);

        await updateDoc(docRef, {
          product_name: payload.productInfo.product_name,
          price: payload.productInfo.price,
          quantity: payload.productInfo.quantity,
          category: payload.productInfo.category,
          description: payload.productInfo.description,
          updatedAt: Date.now(),
        });
      }
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "deleteProductImage/deleteImageFromFirebase",
  async (payload: any) => {
 
    // payload.delRef.imageName
    // payload.delRef.imageURL
    // payload.multipleURL

    const newImagePath = payload.multipleURL.filter(
      (res: any) => res.imageName !== payload.delRef.imageName
    );


    const storageRef = ref(
      storage,
      `documents/product_image/${payload.delRef.imageName}`
    );

    deleteObject(storageRef).then(async () => {
      // File deleted successfully

      const docRef = doc(firestore, "product", payload.id);

      await updateDoc(docRef, {
        multipleURL: newImagePath,
        updatedAt: Date.now(),
      });
    });
  }
);


export const removeProductFromDB = createAsyncThunk("removeProductFromDB/removeProduct", async (payload: any) => {
 

  if (payload.coverImageName) {
     const storageRef = ref(
       storage,
       `documents/product_cover_image/${payload.coverImageName}`
     );

     deleteObject(storageRef)

     await payload.multipleURL.map(async (img: any) => {
       const storageRef = ref(
         storage,
         `documents/product_image/${img.imageName}`
       );

        deleteObject(storageRef)
     });
    
     const docRef = doc(firestore, "product", payload.id);
     await deleteDoc(docRef);

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
  }
})


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
          state.loading = false;
          state.product = action.payload;
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
          state.loading = false;
          state.dashboardProduct = action.payload;
        }
      ),
      // Remove Product
  
      builder.addCase(
        removeProductFromDB.fulfilled,
        (state) => {
 
          state.delete_image_success = "Product deleted successfully";
        }
      ),
      //Get Single Product
      // builder.addCase(getSingleProduct.pending, (state) => {
      //   state.loading = true;
      // }),
      // builder.addCase(getSingleProduct.rejected, (state) => {
      //   state.loading = false;
      //   state.error = "An error occured";
      // }),
      builder.addCase(
        getSingleProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          // state.loading = false;
          // state.error = ""
          state.singleProduct = action.payload;
        }
      );
  },
});

export default vendorSlice.reducer;
export const { closeModal } = vendorSlice.actions;
