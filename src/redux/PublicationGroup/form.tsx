import { PublicationGroupForm, PublicationGroupFormIS } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const PublicationGroupFormSlice = createSlice({
  name: 'PublicationGroupFormSlice',
  initialState: PublicationGroupFormIS,
  reducers: {
    setPublicationGroupFormStore: ({}, action: PayloadAction<PublicationGroupForm>) => action.payload,
    resetPublicationGroupFormStore: () => PublicationGroupFormIS
  }
});

export const {
  setPublicationGroupFormStore,
  resetPublicationGroupFormStore,
} = PublicationGroupFormSlice.actions;
