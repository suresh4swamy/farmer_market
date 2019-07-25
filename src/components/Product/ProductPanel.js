import React, { Component } from 'react';


const ProductPanelEmpty = props => (
    <div className="cover product-panel" {...props}></div>
);

class ProductPanel extends Component {
    renderPanel(product) {
        const defaultPic = "https://firebasestorage.googleapis.com/v0/b/farmersaleplatfo-1561457656175.appspot.com/o/images%2Fanimal_rip_021563445560264.jpeg?alt=media&token=03513c4a-71a8-451a-b11c-fa7d37ecdad0";
        const { _id: id, cul_type, description, locations, main_title, pictures, price, quantity, scale } = product;
        return (
            <div className="cover product-panel">
                <div className="cover-image">
                    <div className="cover-image-holder" style={{ backgroundImage: `url(${pictures && pictures.length ? pictures[0] : defaultPic})` }} />
                </div>
                <div className="cover-text-holder">
                    <div className="cover-text-holder-line" />
                    <div className="cover-text-holder-info">
                        <span className="bg-success">₹ {price}</span><span className="bg-info">{quantity} - Units</span>
                    </div>
                    <div className="cover-text-holder-title">
                        {main_title}
                    </div>
                </div>
            </div>
        );
    }
    render() {
        console.log(this.props.product);
        if (this.props && this.props.product) {
            return this.renderPanel(this.props.product);
        } else {
            const product = { _id: "", cul_type: "", description: "", locations: "", main_title: "", pictures: "", price: "", quantity: "", scale: "" };
            return this.renderPanel(product);
        }
    }
}

export { ProductPanelEmpty };
export default ProductPanel;