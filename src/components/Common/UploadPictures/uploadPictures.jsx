import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';

import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
        srcWidth: 0,
        srcHeight: 0,
        crop: {
            unit: "%",
            x: 10,
            y: 10,
            width: 80,
            height: 80
        }
    }

    unique = 0;

    constructor(props) {
        super(props);
        // this.setState({ images: this.props.data });
        this.unique = 0;
    }

    getUniqueId() {
        this.unique += 1;
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

    handleChangeFile = (evt) => {


        if (evt.currentTarget.files && evt.currentTarget.files.length) {
            let file = evt.currentTarget.files[0];
            let uploadId = this.getUniqueId();
            console.log("Unique ID: " + uploadId);
            let uploadingImages = [...this.state.uploadingImages, { id: "upload_" + uploadId, path: "" }];
            this.setState({ uploadingImages });

            const reader = new FileReader();
            reader.onload = e => {
                // $('#blah').attr('src', e.target.result);
                let path = e.target.result;
                this.setState({
                    uploadingImages: this.state.uploadingImages.map((imgObj, index) => {
                        if (imgObj.id == "upload_" + uploadId) {
                            imgObj.path = e.target.result;
                        }
                        return imgObj;
                    })
                });
                this.setState({ src: e.target.result });
            }
            reader.readAsDataURL(evt.currentTarget.files[0]);

            // this.props.firebase.uploadImage(
            //     "upload_" + uploadId,
            //     file,
            //     (progress, id) => {
            //         this.setState({
            //             uploadingImages: this.state.uploadingImages.map((imgObj, index) => {
            //                 if (imgObj.id == id) {
            //                     imgObj.progress = Math.round(progress);
            //                 }
            //                 return imgObj;
            //             })
            //         });
            //     },
            //     (path, id) => {
            //         let img = new Image();
            //         img.src = path;
            //         img.onload = () => {
            //             console.log("Image loaded -- " + id);
            //             this.setState({
            //                 uploadingImages: this.state.uploadingImages.filter((imgObj, index) => {
            //                     return imgObj.id != id;
            //                 })
            //             });

            //             let data = [...this.props.data, { id: this.props.data.length, path }];
            //             this.props.onChange(path, data);
            //             this.setState({ images: data });
            //         };
            //     },
            //     (error, id) => {
            //         console.log(error);
            //     }
            // );
        }

    }

    onSelectImageToCrop(index) {
        this.setState({ src: this.state.uploadingImages[index].path });
    }

    onImageLoaded = image => {
        // const margin = 15;
        // const crop = { x: margin, y: margin, width: image.offsetWidth - margin * 2, height: image.offsetHeight - margin * 2 };
        // this.setState({ crop });

        console.log('onImageLoaded', image.offsetHeight);
        if (image.offsetHeight > image.offsetWidth) {
            this.setState({ srcWidth: "auto", srcHeight: image.offsetHeight });
        } else {
            this.setState({ srcWidth: image.offsetWidth, srcHeight: "auto" });
        }
    }

    onCropComplete = crop => {
        console.log('onCropComplete', crop);
    }

    onCropChange = crop => {
        console.log('onCropChange', crop);
        this.setState({ crop });
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
                                <div className="imgContainer" key={imgObj.id} onClick={() => this.onSelectImageToCrop(index)}>
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

