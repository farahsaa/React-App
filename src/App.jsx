import React, {Component} from 'react';
import Message from './Message.jsx';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './Message.jsx';





class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      currentUser: {name: 'Anonymous'}, 
      messages: [],
      counter: 0
      
    }
  }

   componentDidMount() {
      // After 3 seconds, set `loading` to false in the state.
      setTimeout(() => {
        this.setState({loading: false}); // this triggers a re-render!
      }, 3000)
    }




  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
      <div className = "App">
        <NavBar/>
        <ChatBar username ={this.state.currentUser.name}/>
        <MessageList messages = {this.state.messages}/>
      </div>

      )
  }
 }
}

export default App;

