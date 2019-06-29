import React, { Component } from 'react';

const Product = props => (
    <React.Fragment>
        <h2>Product</h2>
        <div></div>
    </React.Fragment>
);

class ProductPage extends Component {
    render() {
        return (
            <Product />
        );
    };
}

export default ProductPage;