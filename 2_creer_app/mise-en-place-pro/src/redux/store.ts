import { configureStore } from "@reduxjs/toolkit";
import generalParamsSlice from "./generalParamsSlice";
import persosSlice from "./persosSlice";
import fruitsSlice from "./fruitsSlice";

const store = configureStore({
    reducer: {
        generalParamsSlice,
        persosSlice,
        fruitsSlice
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;