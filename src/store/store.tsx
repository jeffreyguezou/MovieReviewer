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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
