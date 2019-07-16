import React from 'react';
import { compose } from 'recompose';

import { withRouter, Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthorization = (condition, redirectTo) => Component => {
  class WithAuthorization extends React.Component {

    componentDidMount() {

    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            <React.Fragment>
              {authUser && condition(authUser) ? <Component {...this.props} authUser={authUser} /> : redirectTo ? <Redirect to={redirectTo} /> : null}
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
