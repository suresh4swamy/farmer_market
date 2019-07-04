import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';
import "./uploadPictures.css";

const UploadPictures = props => {
    return <UploadPicturesBase {...props} />
}

class UploadPicturesBase extends Component {

    images = [];
    fileUpload = React.createRef();

    state = {
        images: this.props.data,
        uploadingImages: []
    }

    constructor(props) {
        super(props);
        // this.setState({ images: this.props.data });
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
            let uploadIndex = this.state.uploadingImages.length;
            let uploadingImages = [...this.state.uploadingImages, { id: "upload_" + uploadIndex, path: "" }];
            this.setState({ uploadingImages });

            const reader = new FileReader();
            reader.onload = e => {
                // $('#blah').attr('src', e.target.result);
                let path = e.target.result;
                this.setState({
                    uploadingImages: this.state.uploadingImages.map((imgObj, index) => {
                        if (index == uploadIndex) {
                            imgObj.path = e.target.result;
                        }
                        return imgObj;
                    })
                });
            }
            reader.readAsDataURL(evt.currentTarget.files[0]);


            this.props.firebase.uploadImage(
                "upload_" + uploadIndex,
                file,
                (progress, id) => {
                    this.setState({
                        uploadingImages: this.state.uploadingImages.map((imgObj, index) => {
                            if ("upload_" + index == id) {
                                imgObj.progress = Math.round(progress);
                            }
                            return imgObj;
                        })
                    });
                },
                (path, id) => {
                    this.setState({
                        uploadingImages: this.state.uploadingImages.filter((imgObj, index) => {
                            return "upload_" + index != id;
                        })
                    });

                    let data = [...this.props.data, { id: this.props.data.length, path }];
                    this.props.onChange(path, data);
                    this.setState({ images: data });
                },
                (error, id) => {
                    console.log(error);
                }
            );
        }

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
                        {this.state.uploadingImages && this.state.uploadingImages.map((imgObj) => {
                            return (
                                <div className="imgContainer" key={imgObj.id} >
                                    <img src={imgObj.path} style={{ maxWidth: width, minHeight: height }} />
                                    {/* <i className="fa fa-trash-o deleteIcon" style={{ "fontSize": "1.2em" }}></i> */}
                                    <label className="imageCaption">{imgObj.progress} %</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={() => { this.fileUpload.current.click(); }}>Add images</button>
                    <input className="file-upload" ref={this.fileUpload} onChange={this.handleChangeFile} type="file" accept="image/*" />
                </div>
            </div>
        </React.Fragment>;
    }

}

UploadPictures.defaultProps = {
    width: "200px",
    height: "100px"
}

export default withFirebase(UploadPictures);

