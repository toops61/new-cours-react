import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { chronoFields } from "../utils/interfaces";
import { AppDispatch } from "./store";

const initialState: chronoFields = {
    value: 100,
    intervalID: null
};

const chronoSlice = createSlice({
    name: "chrono",
    initialState,
    reducers: {
        tick: state => {
            const resetIntervalFunc = () => {
                if (state.intervalID) {
                    window.clearInterval(state.intervalID);
                    state.intervalID = null;
                }
            }
            state.value > 0 ? state.value-- : resetIntervalFunc();
            return state;
        },
        pause: state => {
            if (state.intervalID) {
                window.clearInterval(state.intervalID);
                state.intervalID = null;
            }
            return state;
        },
        reset: state => {
            state.value = 100;
            if (state.intervalID) {
                window.clearInterval(state.intervalID);
                state.intervalID = null;
            }
            return state;
        },
        setupID: (state,action: PayloadAction<number>) => {
            state.intervalID = action.payload;
            return state;
        }
    }
});

export const startChrono = () => {    
    return function(dispatch:AppDispatch) {
        const intervalID = setInterval(() => {
            dispatch(tick());
        },1000);
        dispatch(setupID(intervalID));
    }
}

/* const resetIntervalFunc = () => {
    return function(dispatch:AppDispatch,getState:()=>{chronoSlice:RootState;}) {
        //console.log(getState().chronoSlice);
        dispatch(pause());

    }
} */

export const { tick,reset,setupID,pause } = chronoSlice.actions;

export default chronoSlice.reducer;