import React, { Component } from 'react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';
import Message from './Message';

class Messages extends Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        messagesloading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        progressBar: false,
        numUniqueUsers: ''
    }

    componentDidMount() {
        const { channel, user } = this.state;

        if ( channel && user ) {
            this.addListeners(channel.id);
        }
    }

    addListeners = channelId => {
        this.addMessageListener(channelId);
    }

    addMessageListener = channelId => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val());
            this.setState({
                messages: loadedMessages,
                messagesloading: false
            });
            this.countUniqueUsers(loadedMessages);
        })
    }

    countUniqueUsers = messages => {
        const uniqueUsers = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        }, []);
        const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0 ;
        const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : "" }`;
        this.setState({ numUniqueUsers });
    }

    displayMessages = messages => 
        messages.length > 0 && messages.map(message => (
            <Message
               key={message.timestamp}
               message={message}
               user={this.state.user} 
            />
        ));

    isProgressBarVisible = percent => {
        if(percent > 0) {
            this.setState({ progressBar: true });
        }
    }
    
    displayChannelName = channel => channel ? `#${channel.name}` : '';

    render() {
        const { messagesRef, messages, channel, user, progressBar, numUniqueUsers } = this.state;

        return(
            <React.Fragment>
                <MessagesHeader 
                   channelName={this.displayChannelName(channel)}
                   numUniqueUsers={numUniqueUsers}
                />

                <Segment>
                    <Comment.Group className={progressBar ? 'messages_progress' :
                    'messages'}>
                        {this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>

                <MessageForm 
                   messagesRef={messagesRef}
                   currentChannel={channel}
                   currentUser={user}
                   isProgressBarVisible={this.isProgressBarVisible}
                />
            </React.Fragment>
        )
    }
}

export default Messages;