import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchFields, usersFields } from "../utils/interfaces";
import { AppDispatch } from "./store";
import { v4 as uuidv4 } from "uuid";

const initialState: fetchFields = {
    loading: false,
    data: null,
    error: false
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addData: (state,action: PayloadAction<usersFields[]>) => {
            state.data = action.payload.map(user => {return{...user,id:uuidv4()}});
            state.loading = false;
            return state;
        },
        addLoader: state => {
            state.loading = true;
            return state;
        },
        addError: state => {
            state.error = true;
            state.loading = false;
            return state;
        }
    }/* ,
    extraReducers: builder => {
        builder
            .addCase(updateGeneralParams, (state,action) => {
                console.log(action);
                
            })} */
});

export const getData = () => {
    return function(dispatch:AppDispatch) {
        dispatch(addLoader());
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => dispatch(addData(data)))
        .catch(() => dispatch(addError()))
    }
}

export const { addData,addLoader,addError } = usersSlice.actions;

export default usersSlice.reducer;