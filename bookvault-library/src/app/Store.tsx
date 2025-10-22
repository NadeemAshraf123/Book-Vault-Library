import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/BookSlice";
import authReducer from '../features/AuthSlice';


export const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
