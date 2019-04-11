import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';





class App extends Component { 
  constructor(props){
    super(props),
    this.state = {
      loading: true,
      currentUser: {name: 'Anonymous'}, 
      messages: [],
      counter: 0,      
    }
    this.newMessage = this.newMessage.bind(this) 
   }
   componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.onopen = () =>{
      console.log('server connected')

    
    }
  
  console.log('componentDidMount <App />');
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username:'Michelle', content: 'Hello there!'};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages, loading:false})
  }, 3000);
    } 




newMessage (message){
  console.log(message);
  const oldMessage = this.state.messages;
  const newMessageList = [...oldMessage, message];
  this.socket.send(JSON.stringify(message));
  this.setState({messages: newMessageList});
}

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
      <div className = "App">
        <NavBar/>
        <ChatBar username ={this.state.currentUser.name} newMessage={this.newMessage} changeUser= {this.changeUser}/>
        <MessageList messages = {this.state.messages}/>
      </div>

      )
  }
 }
}

export default App;

