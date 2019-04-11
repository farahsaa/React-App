import React, {Component} from 'react';

class ChatBar extends Component {
    constructor() {
      super(),
    this.onKeyPress = this.onKeyPress.bind(this) 
    // ask for clarification on binding the function to chatbar comp
    }
  
    onKeyPress(event) {
     if(event.key === 'Enter'){
         const content = event.target;
         const username = this.props.username;

         this.props.newMessage ({
            id: Date.now(), 
            username: username.value,
            content: content.value,

         })
     }
    }
  
  
    render() {
      return (
        <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input onKeyPress={this.onKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
    }
  }
  
  export default ChatBar;