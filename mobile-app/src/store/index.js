import { configureStore } from "@reduxjs/toolkit";
import { accountReducer, setUser, logout } from "./slices/acountSlice";
import { activityReducer, activitySelectors } from "./slices/activitySlice";
import { commentReducer, setComments, addComment } from "./slices/commentSlice";


const store = configureStore({
    reducer: {
        account: accountReducer,
        activity: activityReducer,
        comment: commentReducer
    }
});


export { store, setUser, logout, activitySelectors, setComments, addComment };

export * from './thunks/loginUser';
export * from './thunks/fetchCurrentUser';
export * from './thunks/fetchActivities'