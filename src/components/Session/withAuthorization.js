import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {

    listener = authUser => {
      if (!condition(authUser)) {
        this.props.history.push(ROUTES.SIGN_IN);
      }
      return true;
    }
    componentDidMount() {
    }

    componentWillUnmount() {
      // this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            this.listener(authUser) ? <Component {...this.props} /> : null
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
