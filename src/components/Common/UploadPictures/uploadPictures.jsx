import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';

import ImageCropper from '../ImageCropper';

import "./uploadPictures.css";

const UploadPictures = props => {
    return <UploadPicturesBase {...props} />
}

class UploadPicturesBase extends Component {

    fileUpload = React.createRef();

    state = {
        images: this.props.data,
        uploadingImages: [],
        cropImage: null,
        cropImageName: "",
        currentImage: null
    }
    componentDidMount() {
        this.setState({ images: this.props.data });
    }
    handleAddImages = (evt) => {

    }
    handleDeleteImage = async (evt, imgObj) => {
        evt.stopPropagation();
        const id = await this.props.firebase.deleteImage(imgObj.id, imgObj.name);
        const images = this.state.images.filter(imgObj => {
            return imgObj.id != id;
        });
        const currentImage = null;
        this.setState({ currentImage, images });
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
        let currentImgObj = null;
        let img = new Image();
        img.src = path;
        img.onload = () => {
            console.log("Image loaded -- " + id);
            this.setState({
                uploadingImages: this.state.uploadingImages.filter((imgObj, index) => {
                    currentImgObj = imgObj;
                    return imgObj.id != id;
                })
            });

            let data = [...this.props.data, { id: this.props.data.length, path, name: currentImgObj.name }];
            this.props.onChange(path, data);
            this.setState({ images: data });
        };
    }
    handleChangeFile = (evt) => {
        if (evt.currentTarget.files && evt.currentTarget.files.length) {
            let file = evt.currentTarget.files[0];
            const reader = new FileReader();
            reader.onload = e => {
                let cropImage = e.target.result;
                this.setState({ cropImage, cropImageName: file.name });
            }
            reader.readAsDataURL(evt.currentTarget.files[0]);
        }
    }
    onSelectImageToShow(imagePath) {
        this.setState({ currentImage: imagePath });
    }
    onCropDone = croppedImage => {
        let uploadId = new Date().getTime();
        let name = this.state.cropImageName.match(/^([\s\S]+)(?=\.)/g).join() + new Date().getTime() + ".jpeg";
        let uploadingImages = [...this.state.uploadingImages, { id: "upload_" + uploadId, path: croppedImage, name }];
        this.setState({ uploadingImages, cropImage: null });

        const uploadImage = this.props.firebase.uploadImage("upload_" + uploadId, { name, base64: croppedImage }, this.uploadingProgress);
        uploadImage.then(data => {
            this.uploadedSuccessful(data.url, data.id);
        });
        uploadImage.catch(error => {
            console.log(error);
        });
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
                                <div className="imgContainer" key={imgObj.id} onClick={() => this.onSelectImageToShow(imgObj.path)}>
                                    <img src={imgObj.path} style={{ maxWidth: width, minHeight: height }} />
                                    <i className="fa fa-trash-o deleteIcon" style={{ "fontSize": "1.2em" }} onClick={event => this.handleDeleteImage(event, imgObj)}></i>
                                </div>
                            )
                        })}
                        {this.state.uploadingImages && this.state.uploadingImages.map((imgObj, index) => {
                            return (
                                <div className="imgContainer" key={imgObj.id} onClick={() => this.onSelectImageToShow(imgObj.path)}>
                                    <img src={imgObj.path} style={{ maxWidth: width, minHeight: height }} />
                                    <label className="imageCaption" style={{ width: imgObj.progress + "%" }}></label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {this.state.currentImage &&
                    <div className="currentImageMax">
                        <img src={this.state.currentImage} />
                    </div>
                }
                {this.state.images.length + this.state.uploadingImages.length < 5 &&
                    <div className="imgBtnContainer">
                        <button className="btn btn-primary" onClick={() => { this.fileUpload.current.click(); }}>Add images</button>
                        <input className="file-upload" ref={this.fileUpload} onChange={this.handleChangeFile} type="file" accept="image/*" />
                    </div>
                }

                <ImageCropper src={this.state.cropImage} onCropDone={this.onCropDone} onCropCancel={this.onCropCancel} />
            </div>
        </React.Fragment>
    }

}

UploadPictures.defaultProps = {
    width: "200px",
    height: "100px"
}

export default withFirebase(UploadPictures);

