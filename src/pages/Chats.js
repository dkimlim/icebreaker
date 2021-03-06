import React, {Component} from 'react';
import MessageList from './MessageList.js';
import ChatBar from './ChatBar.js';
import ChatWindow from './ChatWindow.js';
import axios from 'axios';

class Chats extends Component {
// Set initial state so the user is initially anonymous
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws:localhost:3001');
    this.brandNewMessage = this.brandNewMessage.bind(this);
    this.chattingWithUser = this.chattingWithUser.bind(this);
    this.removeFromFriends = this.removeFromFriends.bind(this);
    this.getNewGame = this.getNewGame.bind(this);
    this.sendGame = this.sendGame.bind(this);
    this.state = {
      currentUserID: 0,
      userlikesid: 0,
      matches:[],
      messages: [],
      fromMe: true,
      user2: 0,
      hasData: false,
      user2Info: [],
      lovemale: null,
      lovefemale: null,
      loveother: null,
      oldMessage: false,
      game_played: false,
      game: {question: "Would you rather lose all of your money and valuables or all of the pictures you have ever taken?", answer:""}
    };
  }
  removeFromFriends(e){
    console.log( " Removed from Friends...", this.state.user2)
    var that = this
    var matchArray = this.state.matches
          for (let friend of matchArray){
            if (friend.id == this.state.user2){
              matchArray.splice(friend, 1)
              }
        this.setState({
         matches: matchArray,
         user2Info: [],
         hasData:false
         })

        console.log(" NEW MATCH ARRAY", this.state.matches )
        }

       axios.post(`/api/friendremoved/${this.state.user2}`, {

      })
      .then(function (response) {
          that.setState({
          user2: 0


        });
        console.log("NEW MATCHES ARRAY", that.state.matches)
        console.log("has been removed",  response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  brandNewMessage(message) {
    const newMessage = {type: 'postMessage', currentUser: message.currentUser, content: message.input, fromMe: true, user2: this.state.user2, userlikesid: this.state.userlikesid};
    this.socket.send(JSON.stringify(newMessage));
    this.setState({ oldMessage: true })
  }
    getNewGame(){
      axios.get('/api/new_game')
      .then(response => {
        console.log( "GAME" , response.data )
        this.setState({
            game: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  sendGame(e){
    var userlikesid = this.state.userlikesid
    var content = this.state.game.question
    var userid = this.state.currentUserID

     axios.post('/api/message_db', {
          userlikesid: userlikesid,
          input: content,
          currentUser: userid
        })
         .catch(function (error) {
        console.log(error);
      });

  const newMessage = {type: 'postMessage', currentUser: this.state.currentUserID, content: this.state.game.question, fromMe: true, user2: this.state.user2, userlikesid: this.state.userlikesid};
    this.socket.send(JSON.stringify(newMessage));
    this.setState({ oldMessage: true })
    }


  chattingWithUser(e) {
console.log("chattingWithUser",e.target)
    if(e.target.value){
    this.setState({
       messages: []
    })

    const that = this
    axios.get(`/api/chat_window/${e.target.value}`, {

      })
      .then(function (response) {
          that.setState({
              hasData: true,
              user2: response.data[0].id,
              user2Info: response.data,
              userlikesid: response.data[0].userlikesid,
              oldMessage: true
            })
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.socket.onopen = (event) => {
      console.log('Connected to server' , event)
     }
    this.socket.onmessage = (event) => {
    const newMess = JSON.parse(event.data)
    if(newMess.userlikesid === this.state.userlikesid){
    const messages = this.state.messages.concat(newMess);
    this.setState({messages: messages});
      }
     }
    }
  }

  // Called after the component was rendered and it was attached to the DOM.
  componentDidMount() {

     axios.get('/api/message_list')
      .then(response => {
        this.setState({
            matches: response.data
        });
        console.log("MESSAGE LIST MATCHED 1", response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get('/api/userID')
      .then(response => {
        console.log('USER ID =======>', response.data)
        this.setState({
            currentUserID: Number(response.data)
        });
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get('/api/new_game')
      .then(response => {
        console.log(response.data);
        this.setState({
            game: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // Called any time the props or state changes. The JSX elements returned in this method will be rendered to the DOM.
  render() {

    return (
      <div>
      <ChatWindow oldMessage= {this.state.oldMessage} game={this.state.game} getNewGame={this.getNewGame}  sendGame={this.sendGame}currentUser= {this.state.currentUserID} user2 = {this.state.user2} userlikesid = {this.state.userlikesid} messages = {this.state.messages} userlikesid = {this.state.userlikesid} removeFromFriends={this.removeFromFriends} hasData={this.state.hasData}  user2Info={this.state.user2Info}/>
      <MessageList messages = {this.state.messages}  chattingWithUser={this.chattingWithUser} matches = {this.state.matches} user2 = {this.state.user2}  />
      <ChatBar  currentUser= {this.state.currentUserID} user2 = {this.state.user2} userlikesid = {this.state.userlikesid} brandNewMessage={this.brandNewMessage}/>
      </div>
    );
  }
}
export default Chats;