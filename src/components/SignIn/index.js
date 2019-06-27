import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import './signin.scss';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const bg = require('../../assests/images/nature/001.jpg');

const SignInPage = () => (
  // <div>
  //   <h1>SignIn</h1>
  //   <SignInForm />
  //   <SignInGoogle />
  //   <SignInFacebook />
  //   <SignInTwitter />
  //   <PasswordForgetLink />
  //   <SignUpLink />
  // </div>

  <div className="container" style={{ backgroundImage: `url(${bg})` }}>
    <div className="d-flex justify-content-center h-100">
      <div className="card">
        <div className="card-header">
          <h3>Sign In</h3>
          <div className="d-flex justify-content-end social_icon">
            {/* <span><i className="fab fa-facebook-square"></i></span> */}
            {/* <span><i className="fab fa-google-plus-square"></i></span> */}
            {/* <span><i className="fab fa-twitter-square"></i></span> */}
            <SignInFacebook />
            <SignInGoogle />
            <SignInTwitter />
          </div>
        </div>
        <div className="card-body">
          <SignInForm />
          {/* <form>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
              <input type="text" className="form-control" placeholder="username" />

            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-key"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="password" />
            </div>
            <div className="row align-items-center remember">
              <input type="checkbox" />
              Remember Me
            </div>
            <div className="form-group">
              <input type="submit" value="Login" className="btn float-right login_btn" />
            </div>
          </form> */}
        </div>
        <div className="card-footer">
          <SignUpLink />
          {/* <div className="d-flex justify-content-center links">
            Don't have an account?<a href="#">Sign Up</a>
          </div> */}
          {/* <div className="d-flex justify-content-center">
            <a href="#">Forgot your password?</a>
          </div> */}
          <PasswordForgetLink />
        </div>
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      // <form onSubmit={this.onSubmit}>
      //   <input
      //     name="email"
      //     value={email}
      //     onChange={this.onChange}
      //     type="text"
      //     placeholder="Email Address"
      //   />
      //   <input
      //     name="password"
      //     value={password}
      //     onChange={this.onChange}
      //     type="password"
      //     placeholder="Password"
      //   />
      //   <button disabled={isInvalid} type="submit">
      //     Sign In
      //   </button>

      //   {error && <p>{error.message}</p>}
      // </form>

      <form onSubmit={this.onSubmit}>
        <div className="input-group form-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-user"></i></span>
          </div>
          {/* <input type="text" className="form-control" placeholder="username" /> */}
          <input name="email" className="form-control" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />

        </div>
        <div className="input-group form-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><i className="fas fa-key"></i></span>
          </div>
          {/* <input type="password" className="form-control" placeholder="password" /> */}
          <input name="password" className="form-control" value={password} onChange={this.onChange} type="password" placeholder="Password" />
        </div>
        <div className="row align-items-center remember">
          <input type="checkbox" />
          Remember Me
        </div>
        <div className="form-group">
          {/* <input type="submit" value="Login" className="btn float-right login_btn" /> */}
          <button disabled={isInvalid} type="submit" className="btn float-right login_btn">
            Sign In
         </button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      // <form onSubmit={this.onSubmit}>
      //   <button type="submit">Sign In with Google</button>

      //   {error && <p>{error.message}</p>}
      // </form>
      <React.Fragment>
        <span onClick={this.onSubmit}><i className="fab fa-google-plus-square"></i></span>
        {error && <p>{error.message}</p>}
      </React.Fragment>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      // <form onSubmit={this.onSubmit}>
      //   <button type="submit">Sign In with Facebook</button>

      //   {error && <p>{error.message}</p>}
      // </form>
      <React.Fragment>
        <span onClick={this.onSubmit}><i className="fab fa-facebook-square"></i></span>
        {error && <p>{error.message}</p>}
      </React.Fragment>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      // <form onSubmit={this.onSubmit}>
      //   <button type="submit">Sign In with Twitter</button>

      //   {error && <p>{error.message}</p>}
      // </form>
      <React.Fragment>
        <span onClick={this.onSubmit}><i className="fab fa-twitter-square"></i></span>
        {error && <p>{error.message}</p>}
      </React.Fragment>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
