import React, {Component} from 'react';

class Message extends Component {
    constructor() {
      super()
    }

    render() {
      return (
  <div className="message">
    <span className="message-username">{this.props.message.username}</span>
    <span className="message-content">{this.props.message.content}</span>
  </div>
//   <div className="message system">
//     Anonymous1 changed their name to nomnom.
//   </div>
       
      );
    }
  }
  
  export default Message;