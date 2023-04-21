import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Permit {
  permitNumber: string;
  statusDate: string;
  address: string;
  description: string;
  lat: number;
  lng: number;
}

export interface PermitsState {
  value: Permit[];
}

const initialState: PermitsState = {
  value: [],
};

export const permitsSlice = createSlice({
  name: "permits",
  initialState,
  reducers: {
    addPermits: (state, action: PayloadAction<Permit[]>) => {
      state.value = [...action.payload];
    },
    resetPermits: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPermits, resetPermits } = permitsSlice.actions;

export default permitsSlice.reducer;
