import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import $ from 'jquery';
// import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'font-awesome/css/font-awesome.css';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import PersonalDetails from '../PersonalDetails/personalDetails';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

// $.something();
const App = () => (
  <Router>
    <React.Fragment>
      <Navigation />
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.PERSONAL_DETAILS} component={PersonalDetails} />
      </Switch>
    </React.Fragment>
  </Router>
);

export default withAuthentication(App);
