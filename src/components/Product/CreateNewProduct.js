import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
// import { withFirebase } from '../Firebase';

import './product.scss';

import { TextInput, TextArea, DropDown } from "../Common/FormElements";
// import ProfilePicture from "../Common/ProfilePic/profilePic";


import UploadPictures from '../Common/UploadPictures/uploadPictures';

const _CreateNewProductBtn = props => {
    const { authUser } = props;
    console.log(authUser);
    return (
        <React.Fragment>
            {
                authUser && authUser.profileType && authUser.profileType.toLowerCase() === "seller" ?
                    <CreateNewProductBtnBase {...props} />
                    :
                    null
            }
        </React.Fragment>
    )
}

class CreateNewProductBtnBase extends Component {
    render() {
        return (
            <button className="btn btn-primary btn-circle btn-xl add-product-btn" onClick={this.props.onClick}>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        );
    }
}

const CreateNewProduct = props => {
    const { authUser } = props;
    return (
        <React.Fragment>
            {
                authUser && authUser.profileType && authUser.profileType.toLowerCase() === "seller" ?
                    <CreateNewProductBase {...props} />
                    :
                    null
            }
        </React.Fragment>
    )
}

class CreateNewProductBase extends Component {
    state = {
        staticImages: [],
        productDetail: {
            main_title: "",
            quantity: "3",
            price: "0",
            scale: "",
            cul_type: "1",
            locations: "",
            description: "",
            pictures: []
        },
        cul_type_list: [{ id: "organic", name: "organic" }, { id: "trusted", name: "trusted" }, { id: "non-organic", name: "non-organic" }, { id: "others", name: "others" }]
    };

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    componentWillUpdate() {

    }

    handleSubmit = (evt) => {
        evt.preventDefault();
    }

    handleProfilePicChange = url => {
        let productDetail = { ...this.state.productDetail };
        productDetail.profile_pic = url;
        this.setState({ productDetail });
        console.log("Profile pic uploaded");
        console.log(url);
    }

    handleChange = ({ currentTarget: { name, value } }) => {
        let productDetail = { ...this.state.productDetail };
        productDetail[name] = value;
        this.setState({ productDetail });
    }
    handleCreateBtn = event => {
        this.props.firebase.addNewProduct(this.state.productDetail);
        this.props.onCreate();
    }
    handleCancelBtn = event => {
        this.props.onCancle();
    }
    handleUploadChange = (path, data) => {
        const pictures = data.map(({ path }) => path);
        const { pictures: pic, ...rest } = this.state.productDetail;
        const productDetail = { pictures, ...rest };
        this.setState({ staticImages: data, productDetail });
    }

    render() {
        const { main_title, quantity, price, scale, cul_type, locations, description } = this.state.productDetail;
        const cul_type_list = this.state.cul_type_list;
        return (

            <form className="create-new-product" style={{ maxWidth: "768px", margin: "0 auto" }} onSubmit={this.handleSubmit}>
                {/* <div className="col-12">
                </div> */}
                <div className="col-12">
                    <UploadPictures data={this.state.staticImages} onChange={this.handleUploadChange}></UploadPictures>
                    <TextInput name="main_title" label="Title" value={main_title} onChange={this.handleChange} />
                    <TextArea name="description" label="Description" value={description} onChange={this.handleChange} />
                    <div className="row">
                        <TextInput name="quantity" className="col-6" type="number" label="Quantity" value={quantity} onChange={this.handleChange} />
                        <TextInput name="price" className="col-6" type="number" label="Price ₹ - Per Qty" min="1" value={price} onChange={this.handleChange} />
                    </div>
                    <TextInput name="scale" type="text" label="Scale / Number - Per Qty" value={scale} placeholder="e.g.:KG" onChange={this.handleChange} />
                    <DropDown name="cul_type" label="Cultivated Type" value={cul_type} data={cul_type_list} onChange={this.handleChange} />
                    <TextArea name="locations" label="Available Location" value={locations} placeholder="Product available locations." onChange={this.handleChange} />
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary btn-circle btn-xl" onClick={this.handleCreateBtn}>
                        <i className="fa fa-check"></i>
                    </button>
                    <button type="button" className="btn btn-warning btn-circle btn-xl" onClick={this.handleCancelBtn}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </form>

        );
    }
}


// const condition = authUser => authUser && authUser.profileType && authUser.profileType.toLowerCase() === "seller";
const condition = authUser => !!authUser;

const CreateNewProductBtn = compose(withAuthorization(condition))(_CreateNewProductBtn);

export { CreateNewProductBtn };
export default compose(withEmailVerification, withAuthorization(condition))(CreateNewProduct);