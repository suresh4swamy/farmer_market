import React, { Component } from 'react';
import { MyCartContext } from '../MyCart';

import './styles.scss';

class MyCartCount extends Component {
    render() {
        return (
            <div className="my-cart-btn-cntr">
                <i className="fas fa-cart-arrow-down"></i>
                <MyCartContext.Consumer>
                    {myCart => (
                        <span> {myCart.count}</span>
                    )}
                </MyCartContext.Consumer>
            </div>
        );
    }
}

export default MyCartCount;