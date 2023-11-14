import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../slices/acountSlice";
import agent from "../../api/agent";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const fetchCurrentUser = createAsyncThunk(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        const user = await AsyncStorage.getItem('user');
        thunkAPI.dispatch(setUser(JSON.parse(user)))
        try {
            const user = await agent.Account.currentUser();
            await AsyncStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: async () => {
            if (!(await AsyncStorage.getItem('user'))) return false;
        }
    }
)