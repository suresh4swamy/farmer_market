import React, { Component } from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import './ImageCropper.scss';

const cropDefault = {
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80
};

class ImageCropper extends Component {
    state = {
        srcImageEl: null,
        crop: { ...cropDefault }
    }

    // Original image loaded on stage.
    onImageLoaded = image => {
        this.setState({ srcImageEl: image });
    }
    // Triggers when the crop area is set.
    onCropComplete = crop => {
        // console.log('onCropComplete', crop);
    }
    // Triggers while crop area is being set.
    onCropChange = crop => {
        this.setState({ crop });
    }

    handleCropOkBtn = async event => {
        const croppedImage = await this.makeClientCrop();
        this.setState({ crop: { ...cropDefault } });
        typeof this.props.onCropDone === "function" && this.props.onCropDone(croppedImage);
    }

    handleCropRotateBtn = event => {
        console.log("Crop Rotate button clicked. This feature is not added.");
    }

    handleCropCancelBtn = event => {
        this.setState({ crop: { ...cropDefault } });
        typeof this.props.onCropCancel === "function" && this.props.onCropCancel();
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
        });
    }

    render() {
        const { src } = this.props;
        return (
            <React.Fragment>
                {
                    src && (
                        <div className="imgPopupContainer">
                            <div className="imageCropContainer">
                                <ReactCrop
                                    src={src}
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
                    )
                }
            </React.Fragment>
        );
    }
}

export default ImageCropper;