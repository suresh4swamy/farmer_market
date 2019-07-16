import React, { Component } from "react";
import PropTypes from "prop-types";

class CheckBoxChoice extends Component {
    state = {
        box: this.props.data
    }
    handleClick = index => {
        let { box } = this.state;
        box[index].checked = !box[index].checked;
        this.setState({ box });
        typeof this.props.onClick === "function" && this.props.onClick(box);
    }
    getCheckBoxes() {
        const { name, data, onClick, value } = this.props;
        const { box } = this.state;
        return box.map(({ id, name, checked }, index) => {
            return <div key={id} style={{ marginRight: 15, cursor: "pointer" }} className="form-check form-check-inline" onClick={() => this.handleClick(index)}>
                {/* <input className="form-check-input" type="checkbox" name={id} id={id} value={id} onChange={onChange} checked={value === id} /> */}
                {/* <i className={"fa fa-" + checked ? "check" : "" + "-square-o"} name={id} id={id} onClick={() => this.handleClick(index)} checked={box} aria-hidden="true"></i> */}
                <i className={checked ? "fa fa-check-square-o" : "fa fa-square-o"} style={{ marginRight: 6 }} name={id} id={id} aria-hidden="true"> </i>
                <label className="form-check-label" htmlFor={id}>{name}</label>
            </div>
        })
    }

    render() {
        const { name, label } = this.props;
        return (<div className="form-group">
            <label htmlFor={name} style={{ "display": "block" }}> {label ? label : "Profile Type"}</label>
            {this.getCheckBoxes()}
        </div>);
    }
}

CheckBoxChoice.propType = {
    data: PropTypes.array.isRequired
}

export default CheckBoxChoice;
