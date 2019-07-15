import React from 'react';
import { compose } from 'recompose';

import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {

    componentDidMount() {

    }

    componentWillUnmount() {
      const authUser = this.props.firebase.getAuthUser();
      if (!authUser) {
        this.props.history.push(ROUTES.SIGN_IN);
      }
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            <React.Fragment>
              {authUser && condition(authUser) ? <Component {...this.props} authUser={authUser} /> : null}
            </React.Fragment>
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
