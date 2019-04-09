import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        const messageList = this.prop.messages.map((message) =>{
            return <Message key = {message.id} message = {message}/>
        })


        return (
        <div className="message">
            {messageList}
        </div>
        )
        
    }
    }
  
  export default MessageList;
