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
      counter: 0,      
    }
    this.newMessage = this.newMessage.bind(this) 
    this.changeUser = this.changeUser.bind(this) 
   }
   componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.onopen = () =>{
      console.log('server connected')

    
    }

    this.socket.addEventListener('message', (event) => {
      console.log('message recieved...')
      let message = JSON.parse(event.data)
  
      this.setState((state) => {
        state.messages =  [...state.messages, message] 
        return state;
      });
    });

  console.log('componentDidMount <App />');
  // setTimeout(() => {
  //   console.log("Simulating incoming message");

  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, username:'Michelle', content: 'Hello there!'};
  //   const messages = this.state.messages.concat(newMessage)
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages, loading:false})
  // }, 3000);
  //   } 

    }

changeUser(newName, callback){
    this.setState({currentUser: {name: newName}, callback})
  }

newMessage (content){
  const message = ({
    id: Date.now(), 
    username: this.state.currentUser.name,
    content: content,
  })
  console.log(message);
  const oldMessage = this.state.messages;
  this.socket.send(JSON.stringify(message));
}

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
      <div className = "App">
        <NavBar/>
        <ChatBar username={this.state.currentUser.name} newMessage={this.newMessage} changeUser= {this.changeUser}/>
        <MessageList messages = {this.state.messages}/>
      </div>

      )
  }
 }
}

export default App;

