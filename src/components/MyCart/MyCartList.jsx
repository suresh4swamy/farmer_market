import React, { Component } from 'react';
import { MyCartContext } from '../MyCart';

import './styles.scss';

let MyCartItems = {
  count: 0,
  items: {},
  addToCart: (item, count) => {
    if (
      MyCartItems.items[item.id] &&
      typeof MyCartItems.items[item.id].count === 'number'
    ) {
      MyCartItems.items[item.id].count += count;
    } else {
      MyCartItems.items[item.id] = item;
      MyCartItems.items[item.id].count = count;
    }
    MyCartItems.refreshCount();
  },
  refreshCount: () => {
    let count = 0;
    for (let key in MyCartItems.items) {
      //   if (!MyCartItems.items[key].count) {
      //     delete MyCartItems.items[key];
      //   } else {
      count += MyCartItems.items[key].count;
      //   }
    }
    MyCartItems.count = count;
    MyCartItems.saveMyCart();
  },
  removeFromCart: id => {
    delete MyCartItems.items[id];
    MyCartItems.refreshCount();
  },
  saveMyCart: () => {
    const cartItems = {
      count: MyCartItems.count,
      items: MyCartItems.items,
    };
    localStorage.setItem('MyCartItems', JSON.stringify(cartItems));
  },
  getMyCart: () => {
    const cartItems = JSON.parse(localStorage.getItem('MyCartItems'));
    if (cartItems && typeof cartItems.count === 'number') {
      MyCartItems.count = cartItems.count;
      MyCartItems.items = cartItems.items;
    }
    return MyCartItems;
  },
};

class MyCartList extends Component {
  render() {
    return (
      <div className="my-cart-btn-cntr">
        <i className="fas fa-cart-arrow-down" />
        <MyCartContext.Consumer>
          {myCart =>
            myCart.count ? <span> {myCart.count}</span> : ''
          }
        </MyCartContext.Consumer>
      </div>
    );
  }
}

export { MyCartItems };
export default MyCartList;
