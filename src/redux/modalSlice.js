import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedTask: {},
  isUpdating: false,
};

const modalSlice = createSlice({
  name: "modalStats",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectTask: (state, { payload }) => {
      state.selectedTask = payload;
    },
    setUpdating: (state, { payload }) => {
      state.isUpdating = payload;
    },
  },
});

export const { openModal, closeModal, toggleModal, selectTask, setUpdating } =
  modalSlice.actions;
export default modalSlice.reducer;
