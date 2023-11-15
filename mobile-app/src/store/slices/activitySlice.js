import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchActivities, fetchActivity } from "../thunks/fetchActivities";

const activitiesAdapter = createEntityAdapter();

const activitySlice = createSlice({
    name:'activity',
    initialState: activitiesAdapter.getInitialState({
        activitiesLoaded:false
    }),
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchActivities.pending, (state, action) => { 
            state.activitiesLoaded = false
        });
        builder.addCase(fetchActivities.fulfilled, (state, action) => {
            activitiesAdapter.setAll(state,action.payload)
            state.activitiesLoaded = true
        });
        builder.addCase(fetchActivities.rejected, (state, action) => {
            state.activitiesLoaded = true
         });
        builder.addCase(fetchActivity.pending, (state, action) => { 
            state.activitiesLoaded = false
        });
        builder.addCase(fetchActivity.fulfilled, (state, action) => {
            activitiesAdapter.upsertOne(state,action.payload)
            state.activitiesLoaded = true
        });
        builder.addCase(fetchActivity.rejected, (state, action) => {
            state.activitiesLoaded = true
         });
    }
})

export const activitySelectors = activitiesAdapter.getSelectors(state=> state.activity);
export const activityReducer = activitySlice.reducer;