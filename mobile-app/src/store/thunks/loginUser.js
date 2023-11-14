import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agent from "../../api/agent";


const loginUser = createAsyncThunk('account/loginUser', async (data, thunkAPI) => {
    try {
        const user = await agent.Account.login(data);
        await AsyncStorage.setItem('user',JSON.stringify(user));
        return user
    } catch (error) {
        return thunkAPI.rejectWithValue({error: error.response.data});
    }
})

export {loginUser}