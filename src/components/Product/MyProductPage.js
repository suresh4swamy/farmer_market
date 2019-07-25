import React, { Component } from 'react';
import './product.scss';
// import ProductDetails from './ProductDetails';
import CreateNewProduct, { CreateNewProductBtn } from './CreateNewProduct';
import MyProductList from './MyProductList';
import ProductList from './ProductList';

class MyProductPage extends Component {
    state = {
        showAddNewProduct: false
    }
    handleAddNewProductBtn = event => {
        let showAddNewProduct = !this.state.showAddNewProduct;
        this.setState({ showAddNewProduct });
    }
    createNewProduct = {
        onCancle: () => {
            this.setState({ showAddNewProduct: false });
            console.log("Product creation canceled.");
        },
        onCreate: () => {
            this.setState({ showAddNewProduct: false });
            console.log("New product created.");
        }
    }
    render() {
        return (
            <div className="product-page">
                {!this.state.showAddNewProduct && <div><MyProductList /></div>}
                {this.state.showAddNewProduct && <CreateNewProduct {...this.createNewProduct} />}
                {!this.state.showAddNewProduct && <CreateNewProductBtn onClick={this.handleAddNewProductBtn} />}
            </div>
        );
    };
}

export default MyProductPage;