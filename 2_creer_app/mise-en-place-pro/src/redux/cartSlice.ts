import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartFruitFields, fruitFields } from "../utils/interfaces";

const initialState: cartFruitFields[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addOne: (state,action: PayloadAction<fruitFields>) => {
            const previousInd:number = state.findIndex(fruits => fruits.id === action.payload.id);
            previousInd === -1 ? state.push({...action.payload,quantity:1}) : state[previousInd].quantity++;
            return state;
        },
        removeOne: (state,action: PayloadAction<fruitFields>) => {
            const previousInd:number = state.findIndex(fruits => fruits.id === action.payload.id);
            previousInd === -1 ? alert('This fruit is not in your cart') : state[previousInd].quantity--;
            if (previousInd !== -1 && state[previousInd].quantity === 0) state.splice(previousInd,1);
            return state;
        }
    }
})

export const { addOne,removeOne } = cartSlice.actions;

export default cartSlice.reducer;