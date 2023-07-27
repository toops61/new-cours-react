import { createSlice } from "@reduxjs/toolkit";
import { fruitFields } from "../utils/interfaces";
import { NewFruit } from "../utils/classes";

const initialState: fruitFields [] = [
    {...new NewFruit('Mango','/images/mango.jpeg',4,'GhgFGH4564hgHGFki7897')},
    {...new NewFruit('Watermelon','/images/watermelon.jpeg',3,'mlkGFRA4564TYtop7851')}
];

const fruitsSlice = createSlice({
    name: "fruits",
    initialState,
    reducers: {
        /* updateFruits: (state,action: PayloadAction<fruitFields>) => {
            const existingInd = state.findIndex(e => e.pseudo === action.payload.pseudo || e.persoName === action.payload.persoName);
            existingInd !== -1 ? state.splice(existingInd,1,action.payload) : state.push(action.payload);
            return state;
        } */
    }
})

//export const {updateFruits} = fruitsSlice.actions;

export default fruitsSlice.reducer;