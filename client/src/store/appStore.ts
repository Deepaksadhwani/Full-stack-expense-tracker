import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import expenseReducer from "./slices/expenseSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
