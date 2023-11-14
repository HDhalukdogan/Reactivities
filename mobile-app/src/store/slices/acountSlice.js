import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/loginUser";
import { fetchCurrentUser } from "../thunks/fetchCurrentUser";
import AsyncStorage from "@react-native-async-storage/async-storage";


const accountSlice = createSlice({
    name: 'account',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) =>{
            state.user = null;
            AsyncStorage.removeItem('user')
        }
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending, (state, action) => { });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload
        });
        builder.addCase(loginUser.rejected, (state, action) => { });
        builder.addCase(fetchCurrentUser.pending, (state, action) => { });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload
        });
        builder.addCase(fetchCurrentUser.rejected, (state, action) => { });
    }
});

export const { setUser, logout } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;