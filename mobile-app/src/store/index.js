import { configureStore } from "@reduxjs/toolkit";
import { accountReducer, setUser, logout } from "./slices/acountSlice";


const store = configureStore({
    reducer: {
        account: accountReducer
    }
});


export { store, setUser, logout };

export * from './thunks/loginUser';
export * from './thunks/fetchCurrentUser';