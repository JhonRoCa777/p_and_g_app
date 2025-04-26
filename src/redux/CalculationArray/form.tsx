import { CalculationForm, CalculationFormArrayIS } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const CalculationFormArraySlice = createSlice({
  name: 'CalculationFormArraySlice',
  initialState: CalculationFormArrayIS,
  reducers: {
    setCalculationFormArrayStore: ({}, action: PayloadAction<CalculationForm[]>) => action.payload,
    setCalculationFormCommentArrayStore: (state, action: PayloadAction<{calculationForm: CalculationForm, comment: string}>) => {
      const {calculationForm, comment} = action.payload;
      for(let i=0; i<state.length; i++){
        if (state[i].NAME === calculationForm.NAME) state[i].COMMENT = comment;
      }
      return state;
    },
    deleteCalculationFormArrayStore: (state, action: PayloadAction<CalculationForm>) => {
      const newState = state.filter(calculation => calculation.NAME !== action.payload.NAME);
      return newState;
    },
    resetCalculationFormArrayStore: () => CalculationFormArrayIS
  }
});

export const {
  setCalculationFormArrayStore,
  setCalculationFormCommentArrayStore,
  deleteCalculationFormArrayStore,
  resetCalculationFormArrayStore
} = CalculationFormArraySlice.actions;
