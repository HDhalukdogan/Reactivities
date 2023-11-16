import {  HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { addComment, setComments, store } from "../store";

export default class CommentHub {
    hubConnection = null;

    constructor(){
    }

    createHubConnection = (activityId) => {
        if (activityId) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl( 'http://10.0.2.2:5000/chat?activityId=' + activityId, {
                    accessTokenFactory: () => store.getState().account.user?.token
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

            this.hubConnection.on('LoadComments', (comments) => {
                store.dispatch(setComments(comments))
            })

            this.hubConnection.on('ReceiveComment', (comment) => {
                store.dispatch(addComment(comment))
            })
        }
    }

    testHub = () => {
        console.log('testHub', this.hubConnection)
    }

    sendComment = async (values) => {
        try {
            await this.hubConnection?.invoke('SendComment', values);
        } catch (error) {
            console.log(error);
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearComment = () => {
        store.dispatch(setComments([]))
        this.stopHubConnection();
    }


}