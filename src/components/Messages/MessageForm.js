import React, { Component } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';

class MessageForm extends Component {
    state = {
        message: '',
        loading: false
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    sendMessage = () => {
        const { messagesRef } = this.props;
        const { message } = this.state;

        if(message) {
            this.setState({ loading: true });
            messagesRef
            
        }
    }

    render() {
        return (
            <Segment className="message_form">
                <Input 
                    fluid
                    name="message"
                    onChange={this.handleChange}
                    style={{ marginButton: '0.7em' }}
                    label={<Button icon={'add'}/>}
                    labelPosition="left"
                    placeholder="write your message"
                />
                <Button.Group icon widths="2">
                    <Button 
                       onClick={this.sendMessage}
                       color="orange"
                       content="Add Reply"
                       labelPosition="left"
                       icon="edit"
                    />
                    <Button 
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />
                </Button.Group>
            </Segment>
        );
    }
}

export default MessageForm;