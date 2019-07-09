import React, { Component } from 'react';
import { readFileFromInputElement } from "../readFile";
import "./profilePic.css";

class ProfilePicture extends Component {
    styles = {
        imgSize: {
            width: this.props.width,
            height: this.props.height
        },
        p_image: {
            top: this.props.width * 3 / 4,
            left: this.props.height * 3 / 4
        }
    }

    fileUpload = React.createRef();
    profilePicViewer = React.createRef();

    // readURL = (input) => {
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = (e) => {
    //             // this.profilePicViewer.current.src = e.target.result;
    //             this.props.firebase.uploadFile(input.files[0], this.props.onChange, this.handleOnUploadError);
    //         }
    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }

    handleOnUploadError = (error) => {
        console.log("upload error");
        console.log(error);
    }

    openFileMenu = () => {
        this.fileUpload.current.click();
    }

    handleChangeFile = () => {
        readFileFromInputElement(this.fileUpload.current, this.handleOnLoadComplete);
    }

    handleOnLoadComplete = (file, inputFiles) => {
        this.props.firebase.uploadFile(file, this.props.onChange).catch(this.handleOnUploadError);
    }

    render() {
        const { imgSize } = this.styles;
        return <div><div className="pic_container" style={imgSize}>
            <div className="circle" style={imgSize}>
                { /* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img ref={this.profilePicViewer} className="profile-pic rounded-circle" onClick={this.openFileMenu} style={imgSize} alt="profile picture" src={this.props.src} />
            </div>
            <div className="p-image" style={this.styles.p_image}>
                <i className="fa fa-camera upload-button" onClick={this.openFileMenu}></i>
                <input className="file-upload" ref={this.fileUpload} onChange={this.handleChangeFile} type="file" accept="image/*" />
            </div>
        </div></div>;
    }
}

ProfilePicture.defaultProps = {
    width: 128,
    height: 128
}
export default ProfilePicture;

// Check below link for firebase file upload in storage.
// https://medium.com/@kweenofcode/how-to-upload-users-files-to-firebase-storage-for-your-react-application-34d729cbac1d