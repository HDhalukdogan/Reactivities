import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatComment } from "../../models/comment";
import { store } from "../configureStore";

interface CommentState {
    comments: ChatComment[];
    hubConnection: HubConnection | null;
}

const initialState: CommentState = {
    comments: [],
    hubConnection: null
}


export const addComment = createAsyncThunk<any, any>(
    'comment/addComment',
    async (data, thunkAPI) => {
        try {
            data.activityId = store.getState().activity
             await store.getState().comment.hubConnection?.invoke('SendComment', data);
            return data.body;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        createHubConnection: (state, action) => {
            if (store.getState().activity) {
                state.hubConnection = new HubConnectionBuilder()
                    .withUrl(process.env.REACT_APP_CHAT_URL + '?activityId=' + action.payload, {
                        accessTokenFactory: () => store.getState().user.user?.token!
                    })
                    .withAutomaticReconnect()
                    .configureLogging(LogLevel.Information)
                    .build();

                state.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

                state.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    })
                    state.comments = comments
                });

                state.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                    comment.createdAt = new Date(comment.createdAt);
                    state.comments.unshift(comment)
                });
            }
        },

        stopHubConnection: (state) => {
            state.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
        },
        clearComment: (state) => {
            state.comments = [];
            commentSlice.caseReducers.stopHubConnection(state);
        }
    },
    extraReducers: (builder => {
        builder.addCase(addComment.pending, (state) => {
        });
        builder.addCase(addComment.fulfilled, (state, action) => {
            console.log(action.payload)
        });
        builder.addCase(addComment.rejected, (state, action) => {
        });
    })
})


export const { createHubConnection, stopHubConnection, clearComment } = commentSlice.actions;