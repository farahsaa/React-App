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
  
    onKeyPress(event) {
     if(event.key === 'Enter'){

        if (this.props.username != this.state.username) {
            this.props.changeUser(this.state.username, () => {
                this.props.newMessage(event.target.value)
            })
        } else {
            this.props.newMessage(event.target.value)
        }
     }
    }

    changeName = (e) => {
        this.setState({username: e.target.value})
    }
  
    render() {
      return (
        <footer className="chatbar">
        <input className="chatbar-username" value={this.state.username} onChange={this.changeName} placeholder="Your Name (Optional)" />
        <input onKeyPress={this.onKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
    }
  }
  
  export default ChatBar;