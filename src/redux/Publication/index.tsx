import { Publication, PublicationIS } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const PublicationSlice = createSlice({
  name: 'PublicationSlice',
  initialState: PublicationIS,
  reducers: {
    setPublicationStore: ({}, action: PayloadAction<Publication>) => action.payload,
    resetPublicationStore: () => PublicationIS
  }
});

export const {
  setPublicationStore,
  resetPublicationStore,
} = PublicationSlice.actions;
