import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

interface IORDER {
  loading: boolean;
  error: string;
  success: string;
  productOrder: any;
  productOrderDetail: any;
  adminOrder: any;
}

const initialState: IORDER = {
  loading: false,
  error: "",
  success: "",
  productOrder: [],
  productOrderDetail: [],
  adminOrder: [],
};

export const getAdminOrder = createAsyncThunk(
  "getAdminOrder/fetchAllOrder",
  async () => {
    const orderRef = collection(firestore, "orders");
    const q = query(orderRef, orderBy("createdAt", "desc"));

    const orders = getDocs(q).then((docRes) => {
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

    return orders;
  }
);

export const updateOrder = createAsyncThunk(
  "updateOrder/updateOrderStatus",
  async (payload: any) => {
    const docRef = doc(firestore, "orders", payload.id);

    await updateDoc(docRef, {
      status: payload.status,
      updatedAt: Date.now(),
    });

    return "";
  }
);

export const storeOrder = createAsyncThunk(
  "storeOrder/orderItem",
  async (payload: any) => {
    await addDoc(collection(firestore, "orders"), {
      uid: payload.uid,
      totalPrice: payload.totalPrice,
      customerDetail: payload.customerDetail,
      orderItem: payload.orderItem,
      paymentID: "1242425",
      status: "Pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return "";
  }
);

export const getProductOrder = createAsyncThunk(
  "getProductOrder/fetchCustomerOrder",
  async (_, { getState }) => {
    const appState = getState() as RootState;

    const orderRef = collection(firestore, "orders");
    const orderQuery = query(
      orderRef,
      where("uid", "==", appState.auth.user.uid)
    );

    const orders = getDocs(orderQuery).then((docRes) => {
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

    return orders;
  }
);

export const getProductOrderDetail = createAsyncThunk(
  "getProductOrderDetail/fetchSingleProductOrder",
  async (payload: string | any) => {
    const docRef = doc(firestore, "orders", payload);

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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    closeOrderModal(state) {
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    // Store Order
    builder.addCase(storeOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(storeOrder.rejected, (state) => {
      state.loading = false;
      state.error = "An error occured";
    });
    builder.addCase(storeOrder.fulfilled, (state) => {
      state.loading = false;
      state.success = "Checkout was successful";
    });

    // Update Order
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.rejected, (state) => {
      state.loading = false;
      state.error = "An error occured";
    });
    builder.addCase(updateOrder.fulfilled, (state) => {
      state.loading = false;
      state.success = "Order updated successful";
    });

    // All Orders
    builder.addCase(getAdminOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminOrder.rejected, (state) => {
      state.loading = false;
      state.error = "An error occured";
    });
    builder.addCase(
      getAdminOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.adminOrder = action.payload;
        state.loading = false;
      }
    );

    // Customer Orders
    builder.addCase(getProductOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductOrder.rejected, (state) => {
      state.loading = false;
      state.error = "An error occured";
    });
    builder.addCase(
      getProductOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.productOrder = action.payload;
        state.loading = false;
      }
    );

    //Get Single Order Detail
    builder.addCase(getProductOrderDetail.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        getProductOrderDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.productOrderDetail = action.payload;
          state.loading = false;
        }
      );
  },
});

export default orderSlice.reducer;
export const { closeOrderModal } = orderSlice.actions;
