import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persoCard } from "../utils/interfaces";

const initialState: persoCard [] = [];

const persosSlice = createSlice({
    name: "persos",
    initialState,
    reducers: {
        updatePersos: (state,action: PayloadAction<persoCard>) => {
            const existingInd = state.findIndex(e => e.pseudo === action.payload.pseudo || e.persoName === action.payload.persoName);
            existingInd !== -1 ? state.splice(existingInd,1,action.payload) : state.push(action.payload);
        }
    }
})

export const {updatePersos} = persosSlice.actions;

export default persosSlice.reducer;