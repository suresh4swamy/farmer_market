import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

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

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {/* {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )} */}
    <li>
      <SignOutButton />
    </li>
  </ul>
);
const NavigationNonAuth = () => (
  // <nav className="navbar navbar-inverse">
  //   <div className="container-fluid">
  //     <div className="navbar-header">
  //       <a className="navbar-brand" href="#">Farmer Market</a>
  //     </div>
  //     <ul className="nav navbar-nav">
  //       <li className="active">
  //         <Link to={ROUTES.LANDING}>Landing</Link>
  //       </li>
  //       <li>
  //         <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  //       </li>
  //     </ul>
  //   </div>
  // </nav>

  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/" onClick={event => event.preventDefault()}>Farmer Market</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="nav navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </div>
  </nav>

);

export default Navigation;
