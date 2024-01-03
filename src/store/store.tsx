import { configureStore } from "@reduxjs/toolkit";
import appSliceReducer from "./AppSlice";
import authSliceReducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    app: appSliceReducer,
    auth: authSliceReducer,
  },
});
export default store;
