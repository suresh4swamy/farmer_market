import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

class AdminPage extends Component {
  render() {
    return (
      <div>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>

        <Switch>
          <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
          <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
      </div>
    );
  }
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withRouter,
  withEmailVerification,
  withAuthorization(condition, ROUTES.LANDING),
)(AdminPage);
