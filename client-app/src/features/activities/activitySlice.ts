import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Activity, ActivityFormValues } from "../../app/models/activity";
import { PaginatedResult, Pagination, PagingParams } from "../../app/models/pagination";
import { Profile } from "../../app/models/profile";
import { User } from "../../app/models/user";
import { store } from "../../app/store/configureStore";

interface ActivityState {
    activityRegistry: Map<string, Activity>;
    selectedActivity: Activity | undefined;
    editMode: boolean;
    loading: boolean;
    loadingInitial: boolean;
    pagination: Pagination | null;
    pagingParams: PagingParams;
    predicate: Map<any, any>;
}

const initialState: ActivityState = {
    activityRegistry: new Map<string, Activity>(),
    selectedActivity: undefined,
    editMode: false,
    loading: false,
    loadingInitial: false,
    pagination: null,
    pagingParams: new PagingParams(),
    predicate: new Map().set('all', true)
}

const getAxiosParams = () => {
    const params = new URLSearchParams();
    params.append('pageNumber', store.getState().activity.pagingParams.pageNumber.toString());
    params.append('pageSize', store.getState().activity.pagingParams.pageSize.toString());
    store.getState().activity.predicate.forEach((value, key) => {
        if (key === 'startDate') {
            params.append(key, (value as Date).toISOString())
        } else {
            params.append(key, value);
        }
    })
    return params;
}


const getActivity = (id: string) => {
    return store.getState().activity.activityRegistry.get(id);
}


export const loadActivities = createAsyncThunk<PaginatedResult<Activity[]>>(
    'activity/loadActivities',
    async (data, thunkAPI) => {
        try {
            const result = await agent.Activities.list(getAxiosParams());
            result.data.forEach(activity => {
                thunkAPI.dispatch(setActivity(activity))
            })
            thunkAPI.dispatch(setPagination(result.pagination));
            thunkAPI.dispatch(setLoadingInitial(false));
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const loadActivity = createAsyncThunk<Activity, string>(
    'activity/loadActivity',
    async (data, thunkAPI) => {
        try {
            let activity = getActivity(data);
            if (activity) {
                return activity;
            } else {
                activity = await agent.Activities.details(data);
                thunkAPI.dispatch(setActivity(activity))
                return activity;
            }

        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const createActivity = createAsyncThunk<Activity, ActivityFormValues>(
    'activity/createActivity',
    async (data, thunkAPI) => {
        try {
            const user = store.getState().user.user;
            const attendee = new Profile(user!);
            const newActivity = new Activity(data);
            newActivity.hostUsername = user!.username;
            newActivity.attendees = [attendee];
            thunkAPI.dispatch(setActivity(newActivity));
            return newActivity;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const updateActivity = createAsyncThunk<Activity, ActivityFormValues>(
    'activity/updateActivity',
    async (data, thunkAPI) => {
        try {
            await agent.Activities.update(data);
            const updatedActivity = { ...getActivity(data.id!), ...data } as Activity
            return updatedActivity;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const deleteActivity = createAsyncThunk<string, string>(
    'activity/deleteActivity',
    async (data, thunkAPI) => {
        try {
            await agent.Activities.delete(data);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const updateAttendance = createAsyncThunk<User>(
    'activity/updateAttendance',
    async (_, thunkAPI) => {
        try {
            const user = store.getState().user.user;
            const selectedActivityId = store.getState().activity.selectedActivity?.id;
            selectedActivityId && await agent.Activities.attend(selectedActivityId);
            return user!;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const cancelActivityToggle = createAsyncThunk(
    'activity/cancelActivityToggle',
    async (_, thunkAPI) => {
        try {
            await agent.Activities.attend(store.getState().activity.selectedActivity!.id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setPagingParams: (state, action) => {
            state.pagingParams = action.payload
        },
        setPredicate: (state, action) => {
            const resetPredicate = () => {
                state.predicate.forEach((value, key) => {
                    if (key !== 'startDate') state.predicate.delete(key);
                })
            }
            switch (action.payload.predicate) {
                case 'all':
                    resetPredicate();
                    state.predicate.set('all', true);
                    break;
                case 'isGoing':
                    resetPredicate();
                    state.predicate.set('isGoing', true);
                    break;
                case 'isHost':
                    resetPredicate();
                    state.predicate.set('isHost', true);
                    break;
                case 'startDate':
                    state.predicate.delete('startDate');
                    state.predicate.set('startDate', action.payload.value);
            }
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
        setLoadingInitial: (state, action) => {
            state.loadingInitial = action.payload;
        },
        clearSelectedActivity: (state, action) => {
            state.selectedActivity = undefined;
        },
        updateAttendeeFollowing: (state, action) => {
            state.activityRegistry.forEach(activity => {
                activity.attendees.forEach(attendee => {
                    if (attendee.username === action.payload) {
                        attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                        attendee.following = !attendee.following;
                    }
                })
            })
        },
        setActivity: (state, action) => {
            const user = store.getState().user.user;
            if (user) {
                action.payload.isGoing = action.payload.attendees!.some(
                    (a: any) => a.username === user.username
                )
                action.payload.isHost = action.payload.hostUsername === user.username;
                action.payload.host = action.payload.attendees?.find((x: any) => x.username === action.payload.hostUsername);
            }
            action.payload.date = new Date(action.payload.date!);
            state.activityRegistry.set(action.payload.id, action.payload);
        }
    },
    extraReducers: (builder => {
        builder.addCase(loadActivities.pending, (state) => {
            state.loadingInitial = true;
        });
        builder.addCase(loadActivities.fulfilled, (state, action) => {
            state.loadingInitial = false;
        });
        builder.addCase(loadActivities.rejected, (state, action) => {
            state.loadingInitial = false;
        });
        builder.addCase(loadActivity.pending, (state) => {
            state.loadingInitial = true;
        });
        builder.addCase(loadActivity.fulfilled, (state, action) => {
            state.loadingInitial = false;
            state.selectedActivity = action.payload;
        });
        builder.addCase(loadActivity.rejected, (state, action) => {
            state.loadingInitial = false;
        });
        builder.addCase(createActivity.pending, (state) => {
        });
        builder.addCase(createActivity.fulfilled, (state, action) => {
            state.selectedActivity = action.payload
        });
        builder.addCase(createActivity.rejected, (state, action) => {
        });
        builder.addCase(updateActivity.pending, (state) => {
        });
        builder.addCase(updateActivity.fulfilled, (state, action) => {
            state.activityRegistry.set(action.payload.id, action.payload)
            state.selectedActivity = action.payload
        });
        builder.addCase(updateActivity.rejected, (state, action) => {
            console.log(action.payload)
        });
        builder.addCase(deleteActivity.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteActivity.fulfilled, (state, action) => {
            state.loading = false;
            state.activityRegistry.delete(action.payload);
        });
        builder.addCase(deleteActivity.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateAttendance.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAttendance.fulfilled, (state, action) => {
            state.loading = false;
            if (state.selectedActivity?.isGoing) {
                state.selectedActivity.attendees = state.selectedActivity.attendees.filter(a=>a.username !== action.payload.username);
                state.selectedActivity.isGoing = false;
            } else {
                const attendee = new Profile(action.payload);
                state.selectedActivity?.attendees.push(attendee);
                state.selectedActivity!.isGoing = true;
            }
            state.activityRegistry.set(state.selectedActivity!.id,state.selectedActivity!)
        });
        builder.addCase(updateAttendance.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(cancelActivityToggle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancelActivityToggle.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedActivity!.isCancelled = !state.selectedActivity?.isCancelled;
            state.activityRegistry.set(state.selectedActivity!.id, state.selectedActivity!);
        });
        builder.addCase(cancelActivityToggle.rejected, (state, action) => {
            state.loading = false;
        });
    })
})

export const { setPagingParams, setPredicate, setPagination, setLoadingInitial, clearSelectedActivity, updateAttendeeFollowing, setActivity } = activitySlice.actions;

