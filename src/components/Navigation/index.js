import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import { MyCartList } from '../MyCart';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import $ from 'jquery';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
          <NavigationNonAuth />
        )
    }
  </AuthUserContext.Consumer>
);

const handleCollapse = () => {
  $("#navbarNav").collapse('hide');
}

const NavigationAuth = ({ authUser }) => (
  <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/" onClick={event => event.preventDefault()}>Farmer Market</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="nav navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.LANDING} onClick={handleCollapse}>Landing</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.HOME} onClick={handleCollapse}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ACCOUNT} onClick={handleCollapse}>Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.PERSONAL_DETAILS} onClick={handleCollapse}>Personal Details</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.PRODUCTS} onClick={handleCollapse}>Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.MY_PRODUCTS} onClick={handleCollapse}>My Products</Link>
          </li>
          {!!authUser.roles[ROLES.ADMIN] && (
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.ADMIN} onClick={handleCollapse}>Admin</Link>
            </li>
          )}
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
      <Link className="navbar-brand" to={ROUTES.MY_CART} onClick={handleCollapse}><MyCartList /></Link>
    </nav>
  </React.Fragment>
);
const NavigationNonAuth = () => (
  <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/" onClick={event => event.preventDefault()}>Farmer Market</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="nav navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.LANDING} onClick={handleCollapse}>Landing</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.PRODUCTS} onClick={handleCollapse}>Product</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.SIGN_IN} onClick={handleCollapse}>Sign In</Link>
          </li>
        </ul>
      </div>
      <Link className="navbar-brand" to={ROUTES.MY_CART} onClick={handleCollapse}><MyCartList /></Link>
    </nav>
  </React.Fragment>
);

export default Navigation;
