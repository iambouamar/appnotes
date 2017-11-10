import React, { Component } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import Form from './components/Form';
import firebase from 'firebase';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      notes: [],
      name: 'Bouamar',
      currentTitle: '',
      currentDetails: ''
    };
  }

  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCqslQ2sojuX0i354V2h7fLYiJsC54Qd2Q",
      authDomain: "notepad2-51dbb.firebaseapp.com",
      databaseURL: "https://notepad2-51dbb.firebaseio.com",
      projectId: "notepad2-51dbb",
      storageBucket: "",
      messagingSenderId: "359757469763" 
    };
    firebase.initializeApp(config);

    firebase.database().ref('/notes')
      .on('value', snapshot => {
        const fbstore = snapshot.val();
        console.log(fbstore);
        /*const store = _.map(fbstore, (value, id) => {
          return {
            id: id,
            title: value.title,
            details: value.details
          };
        });*/
        if(fbstore) {
          const store = Object.keys(fbstore).map((value) => {
            return {
              id: value,
              title: fbstore[value].title,
              details: fbstore[value].details
            };
          });
          this.setState({
            notes: store
          });
        }
        
      });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
   
    const data = {
      title: this.state.currentTitle,
      details: this.state.currentDetails
    };

    firebase.database().ref('/notes').push(data, response => response);

    this.setState({
      currentTitle: '',
      currentDetails: ''
    });
  }

  deleteNote(id) {
    firebase.database().ref(`/notes/${id}`).remove();
  }

  render() {
    return (
      <div className="App">
        <Header name={this.state.name}/>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          currentTitle={this.state.currentTitle}
          currentDetails={this.state.currentDetails}
        />
        <Grid notes={this.state.notes} deleteNote={this.deleteNote.bind(this)}/>
      </div>
    );
  }
}

export default App;
