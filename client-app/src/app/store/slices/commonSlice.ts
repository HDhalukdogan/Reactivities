import { createSlice } from "@reduxjs/toolkit";
import { ServerError } from "../../models/serverError";

interface CommonState {
    error: ServerError | null;
    token: string | null;
    appLoaded: boolean
}

const initialState: CommonState = {
    error: null,
    token: localStorage.getItem('jwt') || null,
    appLoaded: false
}
export const commonSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setServerError: (state, action) => {
            state.error = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('jwt',action.payload)
        },
        setAppLoaded: (state) => {
            state.appLoaded = true;
        }
    }
})


export const { setServerError, setToken, setAppLoaded } = commonSlice.actions;