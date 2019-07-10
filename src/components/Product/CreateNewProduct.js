import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

import './product.scss';

import TextInput from "../Common/textInput";
import TextArea from "../Common/textArea";
import DropDown from "../Common/dropDrown";
import RadioOption from "../Common/radioOption";
// import ProfilePicture from "../Common/ProfilePic/profilePic";


import UploadPictures from '../Common/UploadPictures/uploadPictures';

const CreateNewProductBtnBase = props => {
    console.log(props);
    return (
        <button className="btn btn-primary btn-circle btn-xl add-product-btn" onClick={props.onClick}>
            <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
    );
};

const CreateNewProduct = props => {
    return <CreateNewProductBase {...props} />
}

class CreateNewProductBase extends Component {
    state = {
        staticImages: [],
        productDetail: {
            main_title: "",
            quantity: "3",
            price: "0",
            cul_type: "1",
            available_location: "village name",
            description: "",
            profile_pic: "https://img.icons8.com/dusk/64/000000/user-male-skin-type-4.png"
        }
    };

    componentDidMount() {
        this.getProfile();
    }

    componentWillReceiveProps() {
        this.getProfile();
    }

    getProfile = () => {
        this.props.firebase.getProfile(data => {
            const userDetails = data;
            this.setState({ userDetails });
        });
    }

    handleSubmit = (evt) => {
        this.props.firebase.doProfileUpdate(this.state.userDetails);
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
        this.props.onCreate();
    }
    handleCancelBtn = event => {
        this.props.onCancle();
    }
    handleUploadChange = (path, data) => {
        this.setState({ staticImages: data });
    }

    render() {
        const { main_title, quantity, price, cul_type, available_location, description } = this.state.productDetail;
        const cul_type_list = [{ id: "0", name: "organic" }, { id: "1", name: "trusted" }, { id: "2", name: "non-organic" }, { id: "3", name: "others" }];
        const available_location_list = [{ id: "0", name: "Farm 1" }, { id: "1", name: "Farm 2" }, { id: "2", name: "Farm 3" }];
        return (
            <form className="create-new-product" style={{ maxWidth: "768px", margin: "0 auto" }} onSubmit={this.handleSubmit}>
                <div className="xl-col-12">
                    <UploadPictures data={this.state.staticImages} onChange={this.handleUploadChange}></UploadPictures>
                </div>
                <div className="xl-col-12">
                    <TextInput name="main_title" label="Title" value={main_title} onChange={this.handleChange} />
                    <TextArea name="description" label="Description" value={description} onChange={this.handleChange} />
                    <TextInput name="quantity" type="number" label="Quantity" min="1" value={quantity} onChange={this.handleChange} />
                    <TextInput name="price" type="number" label="Price Per Quantity" min="1" value={price} onChange={this.handleChange} />
                    <RadioOption name="cul_type" label="Cultivated Type" value={cul_type} data={cul_type_list} onChange={this.handleChange} />
                    <RadioOption name="available_location" label="Available Locations" value={available_location} data={available_location_list} onChange={this.handleChange} />
                    {/* <DropDown name="cul_type" label="Cultivated Type" value={cul_type} data={cul_type_list} onChange={this.handleChange} />
                    <DropDown name="available_location" label="Available Locations" value={available_location} data={available_location_list} onChange={this.handleChange} /> */}
                    {/* <UploadPictures data={this.staticImages}></UploadPictures> */}
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


const condition = authUser => !!authUser;
const CreateNewProductBtn = compose(withAuthorization(condition))(CreateNewProductBtnBase);
export { CreateNewProductBtn };
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(withFirebase(CreateNewProduct));