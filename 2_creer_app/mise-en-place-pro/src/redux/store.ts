import { configureStore } from "@reduxjs/toolkit";
import generalParamsSlice from "./generalParamsSlice";
import persosSlice from "./persosSlice";
import fruitsSlice from "./fruitsSlice";
import cartSlice from "./cartSlice";
import usersSlice from "./usersSlice";
import chronoSlice from "./chronoSlice";
import boxySlice from "./boxySlice";
//import logger from "redux-logger";

const store = configureStore({
    reducer: {
        generalParamsSlice,
        persosSlice,
        fruitsSlice,
        cartSlice,
        usersSlice,
        chronoSlice,
        boxySlice
    }/* ,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(logger) */
});

/* function customMiddleware(store) {
    return function(next) {
        return function(action){
            console.log(store);
        }
    }
} */

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;