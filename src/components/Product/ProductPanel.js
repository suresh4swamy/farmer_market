import React, { Component } from 'react';


const ProductPanelEmpty = props => (
    <div className="cover product-panel"></div>
);

class ProductPanel extends Component {
    render() {
        return (
            <div className="cover product-panel">
                <div className="cover-image">
                    <div className="cover-image-holder" />
                </div>
                <div className="cover-text-holder">
                    <div className="cover-text-holder-line" />
                    <div className="cover-text-holder-title">
                        {"course.title"}
                    </div>
                    <div className="cover-text-holder-info">
                        0 Units - {"course.updatedOn.toDate().toString()"}
                    </div>
                </div>
            </div>
        );
    }
}

export { ProductPanelEmpty };
export default ProductPanel;