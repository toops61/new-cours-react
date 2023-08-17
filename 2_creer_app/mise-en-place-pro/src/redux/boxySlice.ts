import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boxFields } from "../utils/interfaces";

const initialState : boxFields = {
    shadows: [],
    box_params: {
        border_radius: 1,
        height: 10,
        width: 20,
        background_color: '#00ec99'
    }
};

const boxySlice = createSlice({
    name: "boxy-generator",
    initialState,
    reducers: {
        createBoxy: () => ({...initialState}),
        updateBoxy: (state,action: PayloadAction<boxFields>) => {
            return {...state,...action.payload};
        }
    }
})

export const {createBoxy,updateBoxy} = boxySlice.actions;

export default boxySlice.reducer;