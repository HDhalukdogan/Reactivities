import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../../api/agent";




export const fetchActivities = createAsyncThunk(
    'activity/fetchActivities',
    async (_, thunkAPI) => {
        try {
            const activities = await agent.Activity.getActivities();
            return activities;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const fetchActivity = createAsyncThunk(
    'activity/fetchActivity',
    async (id, thunkAPI) => {
        try {
            const activity = await agent.Activity.getActivity(id);
            return activity;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)