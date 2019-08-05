import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// import $ from 'jquery';
// import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'font-awesome/css/font-awesome.css';

import '@emotion/core';

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
import ProductPage, { MyProductPage } from '../Product';
import MyCart, { MyCartContext, MyCartState } from '../MyCart';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

// $.something();
const App = props => {
	return (
		<Router>
			<React.Fragment>
				<MyCartContext.Provider value={MyCartState}>
					<Navigation />
					<Switch>
						<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
						<Route path={ROUTES.SIGN_IN} component={SignInPage} />
						<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
						<PrivateRoute path={ROUTES.HOME} component={HomePage} />
						<PrivateRoute path={ROUTES.ACCOUNT} component={AccountPage} />
						<PrivateRoute path={ROUTES.ADMIN} component={AdminPage} />
						<PrivateRoute path={ROUTES.PERSONAL_DETAILS} component={PersonalDetails} />
						<Route path={ROUTES.PRODUCTS} component={ProductPage} />
						<PrivateRoute path={ROUTES.MY_PRODUCTS} component={MyProductPage} />
						<Route path={ROUTES.MY_CART} component={MyCart} />
						<Route exact path={ROUTES.LANDING} component={LandingPage} />
						<Route render={() => <Redirect to={ROUTES.LANDING} />} />
					</Switch>
				</MyCartContext.Provider>
			</React.Fragment>
		</Router>
	);
};

export default withAuthentication(App);
