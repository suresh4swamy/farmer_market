import React, { Component } from 'react';
import { MyCartContext } from '../MyCart';

import './styles.scss';

let MyCartState = {
    count: 0,
    cartList: {

    },
    addToCart: (item, count) => {
        if (MyCartState.cartList[item.id] && typeof MyCartState.cartList[item.id].count === "number") {
            MyCartState.cartList[item.id].count += count;
        } else {
            MyCartState.cartList[item.id] = item;
            MyCartState.cartList[item.id].count = count;
        }
        MyCartState.refreshCount();
    },
    refreshCount: () => {
        let count = 0;
        for (let key in MyCartState.cartList) {
            count += MyCartState.cartList[key].count;
        }
        MyCartState.count = count;
    }
}

class MyCartList extends Component {
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

export { MyCartState }
export default MyCartList;