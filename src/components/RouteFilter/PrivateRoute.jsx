import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthUserContext } from '../Session';

class PrivateRoute extends React.Component {
    render() {
        const { component: Component, ...rest } = this.props;
        console.log(this.props);
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <Route {...rest} render={
                        props => {
                            return (
                                condition(authUser)
                                    ? <Component {...props} />
                                    : <Redirect to={{
                                        pathname: '/signin',
                                        state: { from: props.location }
                                    }} />
                            );
                        }
                    } />
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;

export default PrivateRoute;


