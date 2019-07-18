import React, { Component } from 'react';
import ProductPanel, { ProductPanelEmpty } from './ProductPanel';

class ProductList extends Component {
    render() {
        return (

            <div className="product-list">
                <div className="product-list-title">Product List</div>
                <div className="list-of-products">
                    <ProductPanel />
                    <ProductPanel />
                    <ProductPanel />
                    <ProductPanel />
                    <ProductPanelEmpty />
                    <ProductPanelEmpty />
                    <ProductPanelEmpty />
                    <ProductPanelEmpty />
                </div>
            </div>
        );
    }
}

export default ProductList;