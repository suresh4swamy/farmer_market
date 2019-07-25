import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import ProductPanel, { ProductPanelEmpty } from './ProductPanel';

class ProductList extends Component {
    state = {
        product_list: []
    }
    componentDidMount = () => {
        this.getProductList();
    }

    getProductList() {
        this.props.firebase.getProducts()
            .then(data => {
                let product_list = [];
                for (let ikey in data) {
                    for (let jkey in data[ikey]) {
                        product_list.push({ _id: jkey, ...data[ikey][jkey] });
                    }
                }
                this.setState({ product_list });
            })
            .catch(err => {
                console.log(err);
            })
    }

    renderProductList() {
        const { product_list } = this.state;
        return (
            <div className="product-list">
                <div className="product-list-title">Product List</div>
                <div className="list-of-products">
                    {product_list.map((product, index) => (
                        <ProductPanel key={index} product={product} />
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
        )
    }
    render() {
        return (
            <div>{this.renderProductList()}</div>
        );
    }
}

export default withFirebase(ProductList);