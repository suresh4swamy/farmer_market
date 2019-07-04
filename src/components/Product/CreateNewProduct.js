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
        staticImages: [
            // { id: 1, path: "https://firebasestorage.googleapis.com/v0/b/farmersaleplatfo-1561457656175.appspot.com/o/images%2Fanimal_rip_01.jpg?alt=media&token=dd206537-231d-4ec9-8a81-f537b4b1308c" },
            // { id: 2, path: "https://firebasestorage.googleapis.com/v0/b/farmersaleplatfo-1561457656175.appspot.com/o/images%2Fanimal_rip_02.jpg?alt=media&token=4c63d53d-f38a-446c-bc8c-a34d267c77d0" },
            // { id: 3, path: "https://firebasestorage.googleapis.com/v0/b/farmersaleplatfo-1561457656175.appspot.com/o/images%2Fanimal_rip_03.jpg?alt=media&token=5969c2a8-b249-4caf-ae0f-38e223ab6364" },
            // { id: 4, path: "https://firebasestorage.googleapis.com/v0/b/farmersaleplatfo-1561457656175.appspot.com/o/images%2Fanimal_rip_04.jpg?alt=media&token=4bcc1119-619d-4264-8dd0-c9d4561ea063" }
        ],
        productDetail: {
            main_title: "",
            quantity: "3",
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

            <form style={{ maxWidth: "768px", margin: "0 auto" }} onSubmit={this.handleSubmit}>
                <div className="xl-col-12">
                    {/* <ProfilePicture src={profile_pic} onChange={this.handleProfilePicChange} firebase={this.props.firebase} /> */}
                    <UploadPictures data={this.state.staticImages} onChange={this.handleUploadChange}></UploadPictures>
                </div>
                <div className="xl-col-12">
                    <TextInput name="main_title" label="Product Title" value={main_title} onChange={this.handleChange} />
                    <TextArea name="description" label="Product Description" value={description} onChange={this.handleChange} />
                    <TextInput name="quantity" type="number" label="Product Quantity" min="1" value={quantity} onChange={this.handleChange} />
                    <DropDown name="cul_type" label="Cultivated Type" value={cul_type} data={cul_type_list} onChange={this.handleChange} />
                    <DropDown name="available_location" label="Available Locations" value={available_location} data={available_location_list} onChange={this.handleChange} />
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

export { CreateNewProductBtn };
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(withFirebase(CreateNewProduct));