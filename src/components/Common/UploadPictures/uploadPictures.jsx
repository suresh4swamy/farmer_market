import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';

import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import "./uploadPictures.css";

const UploadPictures = props => {
    return <UploadPicturesBase {...props} />
}
const cropDefault = {
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80
};
class UploadPicturesBase extends Component {

    images = [];
    fileUpload = React.createRef();

    state = {
        images: this.props.data,
        uploadingImages: [],
        src: null,
        srcFileName: "",
        srcImageEl: null,
        cropedImg: null,
        crop: { ...cropDefault }
    }

    unique = 0;

    constructor(props) {
        super(props);
        // this.setState({ images: this.props.data });
        this.unique = 0;
    }

    generateUniqueId() {
        this.unique += 1;
        return this.unique;
    }
    getUniqueId() {
        return this.unique;
    }

    componentDidMount() {
        this.setState({ images: this.props.data });
        // this.images = this.props.data;
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

    onImageLoaded = image => {
        this.setState({ srcImageEl: image });
        console.log('onImageLoaded', image.offsetHeight);
    }
    onCropComplete = crop => {
        console.log('onCropComplete', crop);
    }
    onCropChange = crop => {
        console.log('onCropChange', crop);
        this.setState({ crop });
    }

    handleCropOkBtn = async event => {
        console.log("Crop ok button clicked.");

        const croppedImage = await this.makeClientCrop();
        // console.log(croppedImage);

        let uploadId = this.generateUniqueId();
        console.log("Unique ID: " + uploadId);
        let uploadingImages = [...this.state.uploadingImages, { id: "upload_" + uploadId, path: croppedImage }];
        this.setState({ uploadingImages, src: null, crop: { ...cropDefault } });


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
    handleCropRotateBtn = event => {
        console.log("Crop Rotate button clicked. This feature is not added.");
    }
    handleCropCancelBtn = event => {
        console.log("Crop Cancel button clicked.");
        this.setState({ src: null, crop: { ...cropDefault } });
    }

    async makeClientCrop() {
        const { srcImageEl, crop } = this.state;
        if (srcImageEl && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                srcImageEl,
                crop,
                "cropped_image.jpeg"
            );
            return croppedImageUrl;
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;

        console.log(image.naturalWidth, image.naturalHeight, image.offsetWidth, image.offsetHeight, crop.width, crop.height);

        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            resolve(canvas.toDataURL("image/jpeg"));
            // resolve("asdf");
        });
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

                {this.state.src && (
                    <div className="imgPopupContainer">
                        <div className="imageCropContainer">
                            <ReactCrop
                                src={this.state.src}
                                crop={this.state.crop}
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        </div>
                        <div className="imgCropBtnContainer">
                            <button className="btn btn-primary" onClick={this.handleCropOkBtn}>OK</button>
                            <button className="btn btn-warning" onClick={this.handleCropRotateBtn}>Rotate</button>
                            <button className="btn btn-info" onClick={this.handleCropCancelBtn}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    }

}

UploadPictures.defaultProps = {
    width: "200px",
    height: "100px"
}

export default withFirebase(UploadPictures);

