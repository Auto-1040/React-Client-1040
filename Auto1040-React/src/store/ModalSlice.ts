import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  loginModalOpen: boolean;
}

const initialState: ModalState = {
  loginModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal(state) {
      state.loginModalOpen = true;
    },
    closeLoginModal(state) {
      state.loginModalOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal } = modalSlice.actions;
export default modalSlice;