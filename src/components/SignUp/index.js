import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import './signup.scss';

const bg = require('../../assests/images/nature/001.jpg');
const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Sign Up</h3>
          </div>
          <div className="card-body">
          <form onSubmit={this.onSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                <input name="username" className="form-control" value={username} onChange={this.onChange} type="text" placeholder="Full Name" />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                </div>
                <input name="email" className="form-control" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input name="passwordOne" className="form-control" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input name="passwordTwo" className="form-control" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
              </div>
              
              <div className="form-group">
                <button className="btn float-right login_btn" disabled={isInvalid} type="submit"> Sign Up </button>
              </div>
              {error && <p>{error.message}</p>}
            </form>


            {/* <form onSubmit={this.onSubmit}>
        <input name="username" value={username} onChange={this.onChange} type="text" placeholder="Full Name" />
        <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
        <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
        <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
        <label> Admin: <input name="isAdmin" type="checkbox" checked={isAdmin} onChange={this.onChangeCheckbox} /> </label>
        <button disabled={isInvalid} type="submit"> Sign Up </button>

        {error && <p>{error.message}</p>}
      </form> */}
      <div className="card-footer">
              <label> Admin: <input name="isAdmin" type="checkbox" checked={isAdmin} onChange={this.onChangeCheckbox} /> </label>
        </div>
          </div>
        </div>
      </div>
    </div>
      
    );
  }
}

const SignUpLink = () => (
  // <p>
  //   Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  // </p>
  <div className="d-flex justify-content-center links">
    Don't have an account?
    {/* <a href="#">Sign Up</a> */}
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </div>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
