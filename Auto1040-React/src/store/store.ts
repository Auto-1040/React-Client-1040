import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from './UserInfoSlice';
import modalSlice from './ModalSlice';

const store = configureStore({
  reducer: {
    userInformation: userInfoSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;