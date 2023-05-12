import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { User, UserFormValues } from "../../app/models/user";
import { router } from "../../app/router/Routes";
import { setToken } from "../../app/store/slices/commonSlice";
import { closeModal } from "../../app/store/slices/modalSlice";


interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}


export const login = createAsyncThunk<User, UserFormValues>(
    'user/login',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.login(data);
            //localStorage.setItem('jwt', JSON.stringify(user.token));
            thunkAPI.dispatch(setToken(user.token))
            thunkAPI.dispatch(closeModal());
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const register = createAsyncThunk<User, UserFormValues>(
    'user/register',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.register(data);
            //localStorage.setItem('jwt', JSON.stringify(user.token));
            thunkAPI.dispatch(setToken(user.token))
            thunkAPI.dispatch(closeModal());
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const getUser = createAsyncThunk<User>(
    'user/getUser',
    async (_, thunkAPI) => {
        try {
            const user = await agent.Account.current();
            thunkAPI.dispatch(setToken(user.token))
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('jwt')) return false;
        }
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('jwt');
            router.navigate('/');
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setImage: (state, action) => {
            if (state.user) state.user.image = action.payload
        },
        setDisplayName: (state, action) => {
            if (state.user) state.user.displayName = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(getUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('jwt');
            router.navigate('/');
        })
        builder.addMatcher(isAnyOf(login.fulfilled, getUser.fulfilled, register.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(login.rejected), (state, action) => {
            throw action.payload;
        });
    })
});

export const { logout, setUser, setImage, setDisplayName } = userSlice.actions;