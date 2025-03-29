import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from './UserInfoSlice';
import modalSlice from './ModalSlice';
import paySlipSlice from './PaySlipSlice'; // Import the PaySlipSlice

const store = configureStore({
  reducer: {
    userInformation: userInfoSlice.reducer,
    modal: modalSlice.reducer,
    paySlips: paySlipSlice.reducer, // Add paySlips to the store
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;