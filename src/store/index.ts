import loginUser from "./loginUser";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    loginUser,
  },
});


// 用于类型推断和提示
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
