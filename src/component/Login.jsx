import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

  state = {
    userid: '',
    userpwd: ''
  }

  handleUserId = event => {
    this.setState({ userid: event.target.value });
  }
  handleUserPwd = event => {
    this.setState({ userpwd: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="login-container" >
        <form onSubmit={this.handleSubmit}>
          <label> User ID: </label>
          <input name="userid" type="text" value={this.state.userid} onChange={this.handleUserId} />
          <label> Password: </label>
          <input type="password" value={this.state.userpwd} onChange={this.handleUserPwd} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Login;
