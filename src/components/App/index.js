import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// import $ from 'jquery';
// import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'font-awesome/css/font-awesome.css';

import { css } from '@emotion/core';

import PrivateRoute from '../RouteFilter';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import PersonalDetails from '../PersonalDetails/personalDetails';
import ProductPage from '../Product';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

// $.something();
const App = () => (
	<Router>
		<React.Fragment>
			<Navigation />
			<Switch>
				<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
				<Route path={ROUTES.SIGN_IN} component={SignInPage} />
				<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
				<PrivateRoute path={ROUTES.HOME} component={HomePage} />
				<PrivateRoute path={ROUTES.ACCOUNT} component={AccountPage} />
				<PrivateRoute path={ROUTES.ADMIN} component={AdminPage} />
				<PrivateRoute path={ROUTES.PERSONAL_DETAILS} component={PersonalDetails} />
				<Route path={ROUTES.PRODUCT} component={ProductPage} />
				<Route exact path={ROUTES.LANDING} component={LandingPage} />
				<Route render={() => <Redirect to={ROUTES.LANDING} />} />
			</Switch>
		</React.Fragment>
	</Router>
);

export default withAuthentication(App);
