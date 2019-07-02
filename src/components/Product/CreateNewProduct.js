import React, { Component } from 'react';
import './product.scss';

const CreateNewProductBtn = props => (
    <button className="btn btn-primary btn-circle btn-xl add-product-btn" onClick={props.onClick}>
        <i className="fa fa-plus" aria-hidden="true"></i>
    </button>
);

class CreateNewProduct extends Component {
    handleCreateBtn = event => {
        this.props.onCreate();
    }
    handleCancelBtn = event => {
        this.props.onCancle();
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    Add new product.
                </div>
                <div>
                    <button type="button" className="btn btn-info btn-circle btn-xl" onClick={this.handleCreateBtn}>
                        <i className="fa fa-check"></i>
                    </button>
                    <button type="button" className="btn btn-warning btn-circle btn-xl" onClick={this.handleCancelBtn}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export { CreateNewProductBtn };
export default CreateNewProduct;