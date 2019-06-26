import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './Login.scss';
import $ from 'jquery';


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
  }
  toggleResetPswd = event => {
    event.preventDefault();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
  }
  toggleSignUp = event => {
    event.preventDefault();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
  }

  render() {
    const componentClicked = () => {
      console.log("facebook btn clicked.");
    }
    const responseFacebook = (response) => {
      console.log(response);
    }
    const responseGoogle = (response) => {
      console.log(response);
    }
    return (
      <div id="logreg-forms">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}> Sign in</h1>
          <div className="social-login">
            <FacebookLogin
              appId=" 672879663150844"
              autoLoad={true}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook} />
            <GoogleLogin
              clientId="798114275164-cktjfs6el9nkvv61kdkqtn8i1paa9bek.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            {/* <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
            <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g"></i> Sign in with Google+</span> </button> */}
          </div>
          <p style={{ textAlign: "center" }}> OR  </p>
          <div className="input-group">
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" value={this.state.userid} onChange={this.handleUserId} />
          </div>

          <div className="input-group">
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" value={this.state.userpwd} onChange={this.handleUserPwd} />
          </div>

          <div className="input-group">
            <button className="btn btn-md btn-rounded btn-block form-control submit" type="submit"><i className="fas fa-sign-in-alt"></i> Sign in</button>
          </div>

          <a href="#" id="forgot_pswd" onClick={this.toggleResetPswd}>Forgot password?</a>
          <hr />
          {/* <!-- <p>Don't have an account!</p>  --> */}
          <button className="btn btn-primary btn-block" type="button" id="btn-signup" onClick={this.toggleSignUp}><i className="fas fa-user-plus"></i> Sign up New Account</button>
        </form>

        <form action="#" className="form-reset">
          <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
          <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
          <a href="#" id="cancel_reset" onClick={this.toggleResetPswd}><i className="fas fa-angle-left"></i> Back</a>
        </form>

        <form action="#" className="form-signup">
          <div className="social-login">
            <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f"></i> Sign up with Facebook</span> </button>
          </div>
          <div className="social-login">
            <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g"></i> Sign up with Google+</span> </button>
          </div>

          <p style={{ textAlign: "center" }}>OR</p>

          <input type="text" id="user-name" className="form-control" placeholder="Full name" required="" autoFocus="" />
          <input type="email" id="user-email" className="form-control" placeholder="Email address" required autoFocus="" />
          <input type="password" id="user-pass" className="form-control" placeholder="Password" required autoFocus="" />
          <input type="password" id="user-repeatpass" className="form-control" placeholder="Confirm Password" required autoFocus="" />

          <div className="input-group">
            <button className="btn btn-md btn-block submit" type="submit"><i className="fas fa-user-plus"></i> Sign Up</button>
          </div>

          <a href="#" id="cancel_signup" onClick={this.toggleSignUp}><i className="fa fa-angle-left"></i> Back</a>
        </form>
        <br />
      </div>
    );
  }
}

export default Login;
