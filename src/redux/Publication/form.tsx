import { PublicationForm, PublicationFormIS } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const PublicationFormSlice = createSlice({
  name: 'PublicationFormSlice',
  initialState: PublicationFormIS,
  reducers: {
    setPublicationFormStore: ({}, action: PayloadAction<PublicationForm>) => action.payload,
    resetPublicationFormStore: () => PublicationFormIS
  }
});

export const {
  setPublicationFormStore,
  resetPublicationFormStore,
} = PublicationFormSlice.actions;
