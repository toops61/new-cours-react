import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fruitFields } from "../utils/interfaces";
import { NewFruit } from "../utils/classes";

const initialState: fruitFields [] = [
    {...new NewFruit('Mango','/images/mango.jpeg',4,'GhgFGH4564hgHGFki7897')},
    {...new NewFruit('Watermelon','/images/watermelon.jpeg',3,'mlkGFRA4564TYtop7851')},
    {...new NewFruit('pineapple','/images/pineapple.jpeg',2,'gh56zYUY4821ytk')},
    {...new NewFruit('apple','/images/apple.jpeg',0.5,'ytIYU4564891hgHGQ26')}
];

const fruitsSlice = createSlice({
    name: "fruits",
    initialState,
    reducers: {
        updateFruits: (state,action: PayloadAction<fruitFields>) => {
            state.push(action.payload);
            return state;
        }
    }/* ,
    extraReducers: builder => {
        builder
            .addCase(addOne, (state,action) => {
                console.log(action);
                
            })
    } */ //Use reducer from other slice https://redux-toolkit.js.org/api/createSlice
})

export const {updateFruits} = fruitsSlice.actions;

export default fruitsSlice.reducer;