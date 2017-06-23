import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import $ from 'jquery-ajax';
import { Button, Card, Row, Col } from 'react-materialize';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    console.log(this.state.username);
    $.ajax({
      method: 'POST',
      url: `http://localhost:3001/signup`,
      data: {
        username: username,
        password: password
      }
    })
    .then(res => {
      console.log('res is ', res);
      browserHistory.push('/login');
    }, err => {
      console.log(err);
    });
  }
  handleUsernameChange(e){
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  render() {
    return(
      <div>
      <h1>Signup</h1>
    <form onSubmit={ this.handleSubmit }>
  <input
    type='text'
    placeholder='username'
    value={ this.state.username }
    onChange={this.handleUsernameChange}
    />
  <input
    type='password'
    placeholder='password'
    value={ this.state.password }
    onChange={this.handlePasswordChange}
    />
  <Button type='submit' value='signup'>Signup</Button>
    </form>
    </div>
  )
  }
}

export default SignUp;
