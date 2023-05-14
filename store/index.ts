import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuth from "./features/auth";
import cartItemReducer from "./features/cart";
import vendorReducer from "./features/vendor";

const authPersistConfig = {
  key: "authState",
  storage,
  whitelist: ["user"],
};

const authReducer = persistReducer(authPersistConfig, userAuth);

const cartPersistConfig = {
  key: "cartState",
  storage,
  whitelist: ["cartItem"],
};

const cartReducer = persistReducer(cartPersistConfig, cartItemReducer)

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    vendor: vendorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// The root state persist all the data for auth(loading, error, emailVerification)

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage"
// import userAuth from "./features/auth";
// import cartReducer from "./features/cart";
// import vendorReducer from "./features/vendor";

// const rootPersistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"]
// }

// const authPersistConfig = {
//   key: "authState",
//   storage,
//   whitelist: ["user"],
// };

// const authReducer = persistReducer(authPersistConfig, userAuth);

// const rootCombineReducer = combineReducers({
//   auth: authReducer,
//   cart: cartReducer,
//   vendor: vendorReducer,
// });

// const rootReducer = persistReducer(rootPersistConfig, rootCombineReducer);

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
