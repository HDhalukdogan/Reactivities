import { configureStore } from "@reduxjs/toolkit";
import { accountReducer, setUser, logout } from "./slices/acountSlice";
import { activityReducer, activitySelectors} from "./slices/activitySlice";


const store = configureStore({
    reducer: {
        account: accountReducer,
        activity: activityReducer
    }
});


export { store, setUser, logout,activitySelectors };

export * from './thunks/loginUser';
export * from './thunks/fetchCurrentUser';
export * from './thunks/fetchActivities'