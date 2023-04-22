import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    isLoading: boolean;
}

const initialState: CounterState = {
    isLoading: false,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        startLoading: (state) => {
            return { ...state, isLoading: true };
        },
        stopLoading: (state) => {
            return { ...state, isLoading: false };
        },
    },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading } = globalSlice.actions;

export default globalSlice.reducer;