import { Calculation, CalculationArrayIS } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const CalculationArraySlice = createSlice({
  name: 'CalculationArraySlice',
  initialState: CalculationArrayIS,
  reducers: {
    setCalculationArrayStore: ({}, action: PayloadAction<Calculation[]>) => action.payload,
    setCalculationCommentArrayStore: (state, action: PayloadAction<{calculation: Calculation, comment: string}>) => {
      const {calculation, comment} = action.payload;
      for(let i=0; i<state.length; i++){
        if (state[i].NAME === calculation.NAME) state[i].COMMENT = comment;
      }
      return state;
    },
    resetCalculationArrayStore: () => CalculationArrayIS
  }
});

export const {
  setCalculationArrayStore,
  setCalculationCommentArrayStore,
  resetCalculationArrayStore
} = CalculationArraySlice.actions;
