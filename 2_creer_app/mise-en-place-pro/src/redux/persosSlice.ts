import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NewPerso {
    pseudo:string;
    persoName:string;
    id:string;
  }

const initialState: NewPerso [] = [];

const persosSlice = createSlice({
    name: "persos",
    initialState,
    reducers: {
        updatePersos: (state,action: PayloadAction<NewPerso>) => {
            const existingInd = state.findIndex(e => e.pseudo === action.payload.pseudo);
            existingInd !== -1 ? state.splice(existingInd,1,action.payload) : state.push(action.payload);
        }
    }
})

export const {updatePersos} = persosSlice.actions;

export default persosSlice.reducer;