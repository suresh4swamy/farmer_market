import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';

import ImageCropper from '../ImageCropper';

import "./uploadPictures.css";

const UploadPictures = props => {
    return <UploadPicturesBase {...props} />
}

class UploadPicturesBase extends Component {

    images = [];
    fileUpload = React.createRef();

    state = {
        images: this.props.data,
        uploadingImages: [],
        src: null,
        srcFileName: ""
    }
    componentDidMount() {
        this.setState({ images: this.props.data });
    }
    handleAddImages = (evt) => {

    }
    handleDeleteImage = (evt) => {

    }
    uploadingProgress = (progress, id) => {
        this.setState({
            uploadingImages: this.state.uploadingImages.map((imgObj, index) => {
                if (imgObj.id == id) {
                    imgObj.progress = Math.round(progress);
                }
                return imgObj;
            })
        });
    }
    uploadedSuccessful = (path, id) => {
        let img = new Image();
        img.src = path;
        img.onload = () => {
            console.log("Image loaded -- " + id);
            this.setState({
                uploadingImages: this.state.uploadingImages.filter((imgObj, index) => {
                    return imgObj.id != id;
                })
            });

            let data = [...this.props.data, { id: this.props.data.length, path }];
            this.props.onChange(path, data);
            this.setState({ images: data });
        };
    }
    handleChangeFile = (evt) => {
        if (evt.currentTarget.files && evt.currentTarget.files.length) {
            let file = evt.currentTarget.files[0];
            const reader = new FileReader();
            reader.onload = e => {
                let src = e.target.result;
                this.setState({ src, srcFileName: file.name });
            }
            reader.readAsDataURL(evt.currentTarget.files[0]);
        }
    }
    onSelectImageToShow(index) {
        console.log("Show image in planel.");
    }
    onCropDone = croppedImage => {
        let uploadId = new Date().getTime();
        let uploadingImages = [...this.state.uploadingImages, { id: "upload_" + uploadId, path: croppedImage }];
        this.setState({ uploadingImages, src: null });

        this.props.firebase.uploadImage(
            "upload_" + uploadId,
            { name: this.state.srcFileName.match(/^([\s\S]+)(?=\.)/g).join() + new Date().getTime() + ".jpeg", base64: croppedImage },
            this.uploadingProgress,
            this.uploadedSuccessful,
            (error, id) => {
                console.log(error);
            }
        );
    }
    onCropCancel = () => {
        this.setState({ src: null });
    }
    render() {
        const { width, height } = this.props;
        return <React.Fragment>
            <div className="imgMainContainer">
                <div className="imgListContainer">
                    <div>
                        {this.state.images && this.state.images.map((imgObj) => {
                            return (
                                <div className="imgContainer" key={imgObj.id} >
                                    <img src={imgObj.path} style={{ maxWidth: width, minHeight: height }} />
                                    <i className="fa fa-trash-o deleteIcon" style={{ "fontSize": "1.2em" }}></i>
                                </div>
                            )
                        })}
                        {this.state.uploadingImages && this.state.uploadingImages.map((imgObj, index) => {
                            return (
                                <div className="imgContainer" key={imgObj.id} onClick={() => this.onSelectImageToShow(index)}>
                                    <img src={imgObj.path} style={{ maxWidth: width, minHeight: height }} />
                                    <label className="imageCaption" style={{ width: imgObj.progress + "%" }}></label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {this.state.images.length + this.state.uploadingImages.length < 5 &&
                    <div className="imgBtnContainer">
                        <button className="btn btn-primary" onClick={() => { this.fileUpload.current.click(); }}>Add images</button>
                        <input className="file-upload" ref={this.fileUpload} onChange={this.handleChangeFile} type="file" accept="image/*" />
                    </div>
                }

                <ImageCropper src={this.state.src} onCropDone={this.onCropDone} onCropCancel={this.onCropCancel} />
            </div>
        </React.Fragment>
    }

}

UploadPictures.defaultProps = {
    width: "200px",
    height: "100px"
}

export default withFirebase(UploadPictures);

