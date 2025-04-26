import { User, UserIS } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: UserIS,
  reducers: {
    setUserStore: ({}, action: PayloadAction<User>) => action.payload,
    resetUserStore: () => UserIS
  }
});

export const {
  setUserStore,
  resetUserStore
} = UserSlice.actions;
