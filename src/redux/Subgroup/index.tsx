import { Subgroup, SubgroupIS } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const SubgroupSlice = createSlice({
  name: 'SubgroupSlice',
  initialState: SubgroupIS,
  reducers: {
    setSubgroupStore: ({}, action: PayloadAction<Subgroup>) => action.payload,
    resetSubgroupStore: () => SubgroupIS
  }
});

export const {
  setSubgroupStore,
  resetSubgroupStore
} = SubgroupSlice.actions;
