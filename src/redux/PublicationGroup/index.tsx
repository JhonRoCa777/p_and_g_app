import { PublicationGroup, PublicationGroupIS } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const PublicationGroupSlice = createSlice({
  name: 'PublicationGroupSlice',
  initialState: PublicationGroupIS,
  reducers: {
    setPublicationGroupStore: ({}, action: PayloadAction<PublicationGroup>) => action.payload,
    resetPublicationGroupStore: () => PublicationGroupIS
  }
});

export const {
  setPublicationGroupStore,
  resetPublicationGroupStore,
} = PublicationGroupSlice.actions;
