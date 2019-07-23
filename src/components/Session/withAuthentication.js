import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

import { BeatLoader } from 'react-spinners';

const loaderStyle = {
  position: "fixed",
  height: 20,
  width: 60,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  margin: "auto"
};

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.props.firebase.setAuthUser(null);

      this.state = {
        authUser: null,
        loading: true
      };
    }

    componentWillMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          this.props.firebase.setAuthUser(authUser);
          this.setState({ authUser, loading: false });
        },
        () => {
          this.props.firebase.setAuthUser(null);
          if (this.state.authUser) {
            this.setState({ authUser: null });
          }
          this.setState({ loading: false });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          {!this.state.loading ? <Component {...this.props} /> : <div style={loaderStyle}><BeatLoader color={'#123abc'} loading={this.state.loading} /></div>}
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
