import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button className="btn btn-primary" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
