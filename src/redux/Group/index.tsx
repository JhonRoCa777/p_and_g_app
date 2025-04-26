import { Group, GroupIS } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const GroupSlice = createSlice({
  name: 'GroupSlice',
  initialState: GroupIS,
  reducers: {
    setGroupStore: ({}, action: PayloadAction<Group>) => action.payload,
    resetGroupStore: () => GroupIS
  }
});

export const {
  setGroupStore,
  resetGroupStore
} = GroupSlice.actions;
