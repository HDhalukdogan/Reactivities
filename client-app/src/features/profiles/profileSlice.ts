import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Photo, Profile, UserActivity } from "../../app/models/profile";
import { store } from "../../app/store/configureStore";
import { updateAttendeeFollowing } from "../activities/activitySlice";
import { setDisplayName, setImage } from "../users/userSlice";

interface ProfileState {
    profile: Profile | null;
    loadingProfile: boolean;
    uploading: boolean;
    loading: boolean;
    followings: Profile[] | [];
    loadingFollowings: boolean;
    activeTab: number;
    userActivities: UserActivity[] | [];
    loadingActivities: boolean;
}

const initialState: ProfileState = {
    profile: null,
    loadingProfile: false,
    uploading: false,
    loading: false,
    followings: [],
    loadingFollowings: false,
    activeTab: 0,
    userActivities: [],
    loadingActivities: false,
}

export const loadProfile = createAsyncThunk<Profile, string>(
    'profile/loadProfile',
    async (data, thunkAPI) => {
        try {
            const profile = await agent.Profiles.get(data)
            return profile;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const uploadPhoto = createAsyncThunk<Photo, Blob>(
    'profile/uploadPhoto',
    async (data, thunkAPI) => {
        try {
            const response: any = await agent.Profiles.uploadPhoto(data)
            const photo: Photo = response.data;
            const user = store.getState().user;
            if (photo.isMain && user) {
                thunkAPI.dispatch(setImage(photo.url))
            }
            return photo;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const setMainPhoto = createAsyncThunk<Photo, Photo>(
    'profile/setMainPhoto',
    async (data, thunkAPI) => {
        try {
            await agent.Profiles.setMainPhoto(data.id)
            thunkAPI.dispatch(setImage(data.url))
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const deletePhoto = createAsyncThunk<Photo, Photo>(
    'profile/deletePhoto',
    async (data, thunkAPI) => {
        try {
            await agent.Profiles.deletePhoto(data.id)
            thunkAPI.dispatch(setImage(data.url))
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const updateProfile = createAsyncThunk<Profile, Partial<Profile>>(
    'profile/updateProfile',
    async (data, thunkAPI) => {
        try {
            await agent.Profiles.updateProfile(data)
            if (data.displayName && data.displayName !== store.getState().user?.user?.displayName) {
                thunkAPI.dispatch(setDisplayName(data.displayName))
            }

            return data as Profile;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const updateFollowing = createAsyncThunk<any, any>(
    'profile/updateFollowing',
    async (data, thunkAPI) => {
        try {
            await agent.Profiles.updateFollowing(data.username)
            thunkAPI.dispatch(updateAttendeeFollowing(data.username))
            if (data.displayName && data.displayName !== store.getState().user?.user?.displayName) {
                thunkAPI.dispatch(setDisplayName(data.displayName))
            }

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const loadFollowings = createAsyncThunk<Profile[], string>(
    'profile/loadFollowings',
    async (data, thunkAPI) => {
        try {
            const followings = await agent.Profiles.listFollowings(store.getState().profile.profile!.username, data)
            return followings;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const loadUserActivities = createAsyncThunk<UserActivity[], any>(
    'profile/loadUserActivities',
    async (data, thunkAPI) => {
        try {
            const activities = await agent.Profiles.listActivities(data.username,data.predicate)
            return activities;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(loadProfile.pending, (state) => {
            state.loadingProfile = true;
        });
        builder.addCase(loadProfile.fulfilled, (state, action) => {
            state.loadingProfile = false;
            state.profile = action.payload;
        });
        builder.addCase(loadProfile.rejected, (state, action) => {
            state.loadingProfile = false;
            console.log(action)
        });
        builder.addCase(uploadPhoto.pending, (state) => {
            state.uploading = true;
        });
        builder.addCase(uploadPhoto.fulfilled, (state, action) => {
            state.uploading = false;
            if (action.payload.isMain && store.getState().user) state.profile!.image = action.payload.url
            state.profile?.photos?.push(action.payload);
        });
        builder.addCase(uploadPhoto.rejected, (state, action) => {
            state.uploading = false;
            console.log(action)
        });
        builder.addCase(setMainPhoto.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(setMainPhoto.fulfilled, (state, action) => {
            state.loading = false;
            if (state.profile && state.profile.photos) {
                state.profile.photos.find(p => p.isMain)!.isMain = false;
                state.profile.photos.find(p => p.id === action.payload.id)!.isMain = true;
                state.profile.image = action.payload.url;
            }
        });
        builder.addCase(setMainPhoto.rejected, (state, action) => {
            state.loading = false;
            console.log(action)
        });
        builder.addCase(deletePhoto.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.profile!.photos = state.profile?.photos?.filter(photo => photo.id !== action.payload.id)
        });
        builder.addCase(deletePhoto.rejected, (state, action) => {
            state.loading = false;
            console.log(action)
        });
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = { ...state.profile, ...action.payload }
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            console.log(action)
        });
        builder.addCase(updateFollowing.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateFollowing.fulfilled, (state, action) => {
            state.loading = false;
            if (state.profile && state.profile.username !== store.getState().user.user?.username && state.profile.username === action.payload.username) {
                action.payload.following ? state.profile.followersCount++ : state.profile.followersCount--;
                state.profile.following = !state.profile.following;
            }
            if (state.profile && state.profile.username === store.getState().user.user?.username) {
                action.payload.following ? state.profile.followingCount++ : state.profile.followingCount--;
            }
            state.followings.forEach(profile => {
                if (profile.username === action.payload.username) {
                    profile.following ? profile.followersCount-- : profile.followersCount++;
                    profile.following = !profile.following;
                }
            })
        });
        builder.addCase(updateFollowing.rejected, (state, action) => {
            state.loading = false;
            console.log(action)
        });
        builder.addCase(loadFollowings.pending, (state) => {
            state.loadingFollowings = true;
        });
        builder.addCase(loadFollowings.fulfilled, (state, action) => {
            state.loadingFollowings = false;
            state.followings = action.payload
        });
        builder.addCase(loadFollowings.rejected, (state, action) => {
            state.loadingFollowings = false;
            console.log(action)
        });
        builder.addCase(loadUserActivities.pending, (state) => {
            state.loadingActivities = true;
        });
        builder.addCase(loadUserActivities.fulfilled, (state, action) => {
            state.loadingActivities = false;
            state.userActivities = action.payload
        });
        builder.addCase(loadUserActivities.rejected, (state, action) => {
            state.loadingActivities = false;
            console.log(action)
        });
    })
})


export const { setActiveTab } = profileSlice.actions;