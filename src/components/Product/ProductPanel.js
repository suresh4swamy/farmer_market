import React, { Component } from 'react';
import { MyCartContext } from '../MyCart';


const ProductPanelEmpty = props => (
    <div className="cover product-panel" {...props}></div>
);

const ProductPanel = props => (
    <MyCartContext.Consumer>
        {myCart => (
            <ProductPanelBase {...props} myCart={myCart} />
        )
        }
    </MyCartContext.Consumer>
);

class ProductPanelBase extends Component {
    state = {
        qty: 0
    }

    componentDidMount() {
        const product = this.props.myCart.items[this.props.product._id.replace(/[-]/g, "")];
        const qty = product && typeof product.count === "number" ? product.count : 0;
        this.setState({ qty });
    }

    _addToCart = (inc) => {
        this.setState((state, props) => {
            const { _id: id, ...rest } = this.props.product;
            this.props.myCart.addToCart({ id: id.replace(/[-]/g, ""), ...rest }, inc);
            return { qty: state.qty + inc }
        });
    }

    getControlQtyBtns() {
        return <React.Fragment>
            <a href="#" className="btn btn-primary" style={{ alignSelf: 'center' }} onClick={this._addToCart.bind(this, -1)}>-</a>
            <div style={{ width: 50, display: 'inline-block' }}>{this.state.qty}</div>
            <a href="#" className="btn btn-primary" style={{ alignSelf: 'center' }} onClick={this._addToCart.bind(this, 1)}>+</a>
        </React.Fragment>
    }

    renderPanel(product) {
        const defaultPic = "https://firebasestorage.googleapis.com/v0/b/farmersaleplatfo-1561457656175.appspot.com/o/images%2Fanimal_rip_021563445560264.jpeg?alt=media&token=03513c4a-71a8-451a-b11c-fa7d37ecdad0";
        const { _id: id, cul_type, description, locations, main_title, pictures, price, quantity, scale } = product;
        return (
            <div className="card" style={{ "width": "18rem", height: 385, position: 'relative' }}>
                <img src={pictures && pictures.length ? pictures[0] : defaultPic} className="card-img-top" style={{ minHeight: 190, maxHeight: 190, width: 'auto', alignSelf: 'center' }} alt="..." />
                <div style={{ position: "absolute", top: 190, height: 20, backgroundColor: "rgba(4, 4, 4, 0.8)", color: '#FFFFFF', width: '100%', textAlign: 'center' }}>₹ {price}</div>
                <div className="card-body">
                    <h5 className="card-title">{main_title}</h5>
                    <p className="card-text" style={{ display: '-webkit-box', overflow: 'hidden', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', height: 72 }}>{description}</p>
                    <div style={{ textAlign: 'center' }}>
                        {this.state.qty === 0 ? <a href="#" className="btn btn-primary" style={{ alignSelf: 'center' }} onClick={this._addToCart.bind(this, 1)}>Add to Cart</a> : this.getControlQtyBtns()}
                    </div>
                </div>
            </div>
        );
    }
    render() {
        if (this.props && this.props.product) {
            return this.renderPanel(this.props.product);
        } else {
            const product = { _id: "", cul_type: "", description: "", locations: "", main_title: "", pictures: "", price: "", quantity: "", scale: "" };
            return this.renderPanel(product);
        }
    }
}

const MyProductPanel = props => (
    <MyProductPanelBase {...props} />
);

class MyProductPanelBase extends Component {
    renderPanel(product) {
        const defaultPic = "https://firebasestorage.googleapis.com/v0/b/farmersaleplatfo-1561457656175.appspot.com/o/images%2Fanimal_rip_021563445560264.jpeg?alt=media&token=03513c4a-71a8-451a-b11c-fa7d37ecdad0";
        const { _id: id, cul_type, description, locations, main_title, pictures, price, quantity, scale } = product;
        return (
            <div className="card" style={{ "width": "18rem", height: 385, position: 'relative' }}>
                <img src={pictures && pictures.length ? pictures[0] : defaultPic} className="card-img-top" style={{ minHeight: 190, maxHeight: 190, width: 'auto', alignSelf: 'center' }} alt="..." />
                <div style={{ position: "absolute", top: 190, height: 20, backgroundColor: "rgba(4, 4, 4, 0.8)", color: '#FFFFFF', width: '100%', textAlign: 'center' }}>₹ {price}</div>
                <div className="card-body">
                    <h5 className="card-title">{main_title}</h5>
                    <p className="card-text" style={{ display: '-webkit-box', overflow: 'hidden', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', height: 72 }}>{description}</p>
                    {/* <div style={{ textAlign: 'center' }}>
                        {this.state.qty === 0 ? <a href="#" className="btn btn-primary" style={{ alignSelf: 'center' }} onClick={this._addToCart.bind(this, 1)}>Add to Cart</a> : this.getControlQtyBtns()}
                    </div> */}
                </div>
            </div>
        );
    }
    render() {
        if (this.props && this.props.product) {
            return this.renderPanel(this.props.product);
        } else {
            const product = { _id: "", cul_type: "", description: "", locations: "", main_title: "", pictures: "", price: "", quantity: "", scale: "" };
            return this.renderPanel(product);
        }
    }
}

export { MyProductPanel, ProductPanelEmpty };
export default ProductPanel;