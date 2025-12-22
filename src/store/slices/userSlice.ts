import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'models/admin.model';

const initialState = {
  isLogin: false,
  user: {} as IUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: {
        type: string;
        payload: any;
      }
    ) {
      state.isLogin = true;
      state.user = action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
