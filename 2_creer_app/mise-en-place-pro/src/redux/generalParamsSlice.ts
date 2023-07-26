import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ParamsState {
    darkMode: boolean;
    numberPersos: number;
}

const initialState: ParamsState = {
    darkMode: false,
    numberPersos: 0
}

const generalParamsSlice = createSlice({
    name: "generalParams",
    initialState,
    reducers: {
        updateGeneralParams: (state,action: PayloadAction<object>) => {
            state = {...state,...action.payload};
            return state;
        }
    }
})

export const {updateGeneralParams} = generalParamsSlice.actions;

export default generalParamsSlice.reducer;