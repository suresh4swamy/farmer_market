import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';


class HomePage extends Component {
  componentWillUnmount() {
    const authUser = this.props.firebase.getAuthUser();
    if (!authUser) {
      this.props.history.push(ROUTES.SIGN_IN);
    }
  }
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Messages />
      </div>
    )
  }
}
const condition = authUser => !!authUser;
export default compose(
  withRouter,
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
