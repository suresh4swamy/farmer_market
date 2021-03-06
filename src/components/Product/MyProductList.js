import React, { Component } from 'react';
import { MyProductPanel, ProductPanelEmpty } from './ProductPanel';

import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';

// const MyProductList = props => <MyProductListBase {...props} />

class MyProductListBase extends Component {
  state = {
    my_product_list: [],
  };
  componentDidMount = () => {
    if (this.props.authUser) {
      this.getMyProductList();
    }
  };

  getMyProductList() {
    this.props.firebase
      .getMyProducts()
      .then(data => {
        let my_product_list = [];
        for (let key in data) {
          my_product_list.push({ _id: key, ...data[key] });
        }
        this.setState({ my_product_list });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderMyProductList() {
    const { my_product_list } = this.state;
    return (
      <div className="my-product-list">
        <div className="my-product-list-title">My Product List</div>
        <div className="list-of-products">
          {my_product_list.map((product, index) => (
            <MyProductPanel key={product._id} product={product} />
          ))}
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
          <ProductPanelEmpty />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>{this.props.authUser && this.renderMyProductList()}</div>
    );
  }
}

const condition = authUser => !!authUser;

const MyProductList = compose(withAuthorization(condition))(
  withFirebase(MyProductListBase),
);

export default MyProductList;
