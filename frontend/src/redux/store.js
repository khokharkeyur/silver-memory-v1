import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./todoReducers";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});
