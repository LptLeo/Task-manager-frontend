import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice.js";
import modalReducer from "./modalSlice.js";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modalStats: modalReducer,
  },
});

export default store;
