import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component { 
  constructor(props){
    super(props),
    this.state = {
      currentUser: {name: 'Anonymous'}, 
      messages: [],
      counter: [],      
    }
  }

  //initiate websocket client connection
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.onopen = () =>{
      console.log('server connected')
    }
    //listens for messages from server and set state dependending on the type of message sent back

    this.socket.addEventListener('message', (event) => {
      console.log('message recieved...')
      let message = JSON.parse(event.data)
      if(message.type === "counter"){
        console.log(message.data)
        this.setState({counter:message.data}) 
      } else {
        this.setState({messages: [...this.state.messages, message] });
      }
    });

  }
  // eventhandler function that will changeuser name to newname
  changeUser = (newName) => {
    this.socket.send(JSON.stringify({
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed name to ${newName}`
    }))
    this.setState({currentUser: {name: newName}})
  }

  //event handler function that will add a message on enter

  newMessage = (content) => {
    const message = ({
      id: Date.now(), 
      username: this.state.currentUser.name,
      content: content,
      type: "postMessage"
    })    
    this.socket.send(JSON.stringify(message));
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className = "App">
          <NavBar counter={this.state.counter}/>
          <ChatBar username={this.state.currentUser.name} newMessage={this.newMessage} changeUser={this.changeUser}/>
          <MessageList messages = {this.state.messages}/>
        </div>

      )
    }
  }
}

export default App;

