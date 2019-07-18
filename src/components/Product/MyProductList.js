import React, { Component } from 'react';
import ProductPanel, { ProductPanelEmpty } from './ProductPanel';

import { compose } from 'recompose';
import { withAuthorization } from '../Session';

class MyProductListBase extends Component {
    render() {
        return (

            <div className="my-product-list">
                <div className="my-product-list-title">My Product List</div>
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

const condition = authUser => !!authUser;

const MyProductList = compose(withAuthorization(condition))(MyProductListBase);
export default MyProductList;