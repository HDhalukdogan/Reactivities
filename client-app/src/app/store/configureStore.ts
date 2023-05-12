import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { activitySlice } from "../../features/activities/activitySlice";
import { profileSlice } from "../../features/profiles/profileSlice";
import { userSlice } from "../../features/users/userSlice";
import { commentSlice } from "./slices/commentSlice";
import { commonSlice } from "./slices/commonSlice";
import { modalSlice } from "./slices/modalSlice";


export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
        modal: modalSlice.reducer,
        common: commonSlice.reducer,
        profile: profileSlice.reducer,
        activity: activitySlice.reducer,
        comment: commentSlice.reducer
    }
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 