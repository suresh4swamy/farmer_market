import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

import './product.scss';

import TextInput from "../Common/textInput";
import TextArea from "../Common/textArea";
import DropDown from "../Common/dropDrown";
import RadioOption from "../Common/radioOption";
import ProfilePicture from "../Common/ProfilePic/profilePic";


import UploadPictures from '../Common/UploadPictures/uploadPictures';

const CreateNewProductBtn = props => (
    <button className="btn btn-primary btn-circle btn-xl add-product-btn" onClick={props.onClick}>
        <i className="fa fa-plus" aria-hidden="true"></i>
    </button>
);

const CreateNewProduct = props => {
    return <CreateNewProductBase {...props} />
}

class CreateNewProductBase extends Component {

    state = {
        productDetail: {
            main_title: "",
            quantity: "3 Qty",
            cul_type: "other",
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

    render() {
        const { main_title, quantity, cul_type, available_location, description } = this.state.productDetail;
        const cul_type_list = [{ id: "0", name: "organic" }, { id: "1", name: "trusted" }, { id: "2", name: "non-organic" }, { id: "3", name: "others" }];
        const available_location_list = [{ id: "0", name: "Farm 1" }, { id: "1", name: "Farm 2" }, { id: "2", name: "Farm 3" }];
        const profile_pic = "https://img.icons8.com/dusk/64/000000/user-male-skin-type-4.png";
        return (
            // <React.Fragment>
            //     <div>
            //         Add new product.
            //     </div>
            //     <div>
            //         <button type="button" className="btn btn-info btn-circle btn-xl" onClick={this.handleCreateBtn}>
            //             <i className="fa fa-check"></i>
            //         </button>
            //         <button type="button" className="btn btn-warning btn-circle btn-xl" onClick={this.handleCancelBtn}>
            //             <i className="fa fa-times"></i>
            //         </button>
            //     </div>
            // </React.Fragment>

            <form style={{ "maxWidth": "450px", "padding": "20px", "margin": "auto" }} onSubmit={this.handleSubmit}>
                <TextInput name="main_title" label="Product Title" value={main_title} onChange={this.handleChange} />
                <ProfilePicture src={profile_pic} onChange={this.handleProfilePicChange} firebase={this.props.firebase} />
                <TextInput name="quantity" label="Product Quantity" value={quantity} onChange={this.handleChange} />
                <DropDown name="cul_type" label="Cultivated Type" value={cul_type} data={cul_type_list} onChange={this.handleChange} />
                <DropDown name="available_location" label="Available Locations" value={available_location} data={available_location_list} onChange={this.handleChange} />
                <TextArea name="description" label="Product Description" value={description} onChange={this.handleChange} />
                {/* <UploadPictures data={this.staticImages}></UploadPictures> */}
                <div>
                    <button type="button" className="btn btn-info btn-circle btn-xl" onClick={this.handleCreateBtn}>
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

export { CreateNewProductBtn };
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(withFirebase(CreateNewProduct));