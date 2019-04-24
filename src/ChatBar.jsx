import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props),
        this.onKeyPress = this.onKeyPress.bind(this) 
        this.state = {
            username: props.username
        }
        // ask for clarification on binding the function to chatbar comp
    }
  
    onKeyPress = (event) => {
     if(event.key === 'Enter'){
       if(event.target.value){
        let k = event.target.value
            this.props.newMessage(k)
            event.target.value = ""
        }
      }
     }
    

    changeName = (e) => {
      if(e.key === 'Enter'){
        if(e.target.value){
       this.props.changeUser(e.target.value)
        }
      }
    }
  
    render() {
      return (
        <footer className="chatbar">
          <input  onKeyUp={this.changeName} placeholder={this.props.username} />
          <input onKeyUp={this.onKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      );
    }
  }
  
  export default ChatBar;