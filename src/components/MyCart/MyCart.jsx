import React, { Component } from 'react';
import MyCartContext from './context';

const MyCart = props => (
  <MyCartContext.Consumer>
    {myCart => <MyCartBase {...props} myCart={myCart} />}
  </MyCartContext.Consumer>
);

class MyCartBase extends Component {
  state = {
    qty: 0,
  };
  componentDidMount() {
    console.log(this.props.myCart);
  }
  addQuantity = (__id, inc) => {
    const { count, ...rest } = this.props.myCart.items[__id];
    if (count || inc > 0) {
      this.props.myCart.addToCart({ count, ...rest }, inc);
    }
  };
  removeProduct = id => {
    this.props.myCart.removeFromCart(id);
  };
  renderMyCartList() {
    const { items } = this.props.myCart;
    return Object.keys(items).map(id => (
      <li className="my-cart-item-panel" key={id}>
        <a
          href="#"
          className="fa fa-close my-cart-item-close-btn"
          style={{ alignSelf: 'center' }}
          onClick={this.removeProduct.bind(this, id)}
        />
        <div
          className="my-cart-item-img-cntr"
          style={{
            backgroundImage: `url("${items[id].pictures[0]}")`,
          }}
        />
        <div className="my-cart-item-props">
          <h3 className="my-cart-item-props-title">
            {items[id].main_title}
          </h3>
          <div className="my-cart-item-props-desc">
            {items[id].description}
          </div>
          <div className="my-cart-item-props-btn-amt-cntr">
            <div className="my-cart-item-props-btn-cntr">
              <a
                href="#"
                className="btn btn-primary"
                style={{ alignSelf: 'center' }}
                onClick={this.addQuantity.bind(this, id, -1)}
              >
                -
              </a>
              <span>{items[id].count}</span>
              <a
                href="#"
                className="btn btn-primary"
                style={{ alignSelf: 'center' }}
                onClick={this.addQuantity.bind(this, id, 1)}
              >
                +
              </a>
            </div>
            <div className="my-cart-item-props-amt">
              ₹: {items[id].price}
            </div>
          </div>
        </div>
      </li>
    ));
  }
  render() {
    return (
      <div className="my-cart-list-container">
        <ul>{this.renderMyCartList()}</ul>
      </div>
    );
  }
}

export default MyCart;
