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
        let k = event.target.value
        if (this.props.username != this.state.username) {
            this.props.changeUser(this.state.username, () => {
                this.props.newMessage(k)
            })
        } else {
            this.props.newMessage(k)
        }
     }
    }

    changeName = (e) => {
        this.setState({username: e.target.value})
    }
  
    render() {
      return (
        <footer className="chatbar">
        <input onBlur={this.changeName} value={this.state.username} onChange={this.changeName} placeholder={this.props.currentUser} />
        <input onKeyUp={this.onKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
    }
  }
  
  export default ChatBar;