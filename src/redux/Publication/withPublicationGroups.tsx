import { PublicationWithPublicationGroupsArrayIS, PublicationWithPublicationGroups } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const PublicationWithPublicationGroupsArraySlice = createSlice({
  name: 'PublicationWithPublicationGroupsArraySlice',
  initialState: PublicationWithPublicationGroupsArrayIS,
  reducers: {
    setPublicationWithPublicationGroupsArrayStore: ({}, action: PayloadAction<PublicationWithPublicationGroups[]>) => action.payload,
    resetPublicationWithPublicationGroupsArrayStore: () => PublicationWithPublicationGroupsArrayIS
  }
});

export const {
  setPublicationWithPublicationGroupsArrayStore,
  resetPublicationWithPublicationGroupsArrayStore,
} = PublicationWithPublicationGroupsArraySlice.actions;
