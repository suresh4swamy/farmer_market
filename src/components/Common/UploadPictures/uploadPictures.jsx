import React, { Component } from 'react';
import "./uploadPictures.css";

class UploadPictures extends Component {

    images = [];
    fileUpload = React.createRef();

    componentDidMount() {
        this.images = this.props.data;
    }

    handleAddImages = (evt) => {

    }

    handleDeleteImage = (evt) => {

    }

    handleChangeFile = (evt) => {

    }

    render() {
        const { width, height } = this.props;
        return <React.Fragment>
            <div>
                <button className="btn btn-primary" onClick={() => { this.fileUpload.current.click(); }}>Add images</button>
                <input className="file-upload" ref={this.fileUpload} onChange={this.handleChangeFile} type="file" accept="image/*" />
            </div>
            {this.images && this.images.map((imgObj) => {
                return (
                    <div className="imgContainer" key={imgObj.id} >
                        <img src={imgObj.path} style={{ maxWidth: width, maxHeight: height }} />
                        <i className="fa fa-trash-o deleteIcon" style={{ "fontSize": "1.2em" }}></i>
                    </div>
                )
            })}
        </React.Fragment>;
    }

}

UploadPictures.defaultProps = {
    width: "200px",
    height: "200px"
}

export default UploadPictures;

