import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { storage, firestore } from "@/lib/firebase";
import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
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
  success:string;
  error: string;
  product: any;
  singleProduct: any;
}

const initialState : IVENDOR= {
  loading: false,
  success: "",
  error: "",
  product: [],
  singleProduct: []
};

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
