import React, {Component} from 'react';
import Message from './Message.jsx';

function Notification(prop) {
  return (
    <div>
      <div className="notification">
         <span>{prop.message.content}</span>
      </div>	
    </div>    
  )
}

class MessageList extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      const messageList = this.props.messages.map((message) =>{
        console.log(message)

        if (message.type === 'incomingNotification') {
          return <Notification key={message.id} message= {message} />
        } else {
          return <Message key = {message.id} message = {message}/>
        }
      });

      return (
        <div>
          {messageList}
        </div>
      )
    }
}
  export default MessageList;
