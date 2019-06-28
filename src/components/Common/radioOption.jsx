import React, { Component } from "react";
import PropTypes from "prop-types";

class RadioOption extends Component {
    getOptions() {
        const { name: groupName, data, onChange, value } = this.props;
        return data.map(function ({ id, name }, index) {
            return <div key={id} className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={groupName} id={id} value={id} onChange={onChange} checked={value === id} />
                <label className="form-check-label" htmlFor={id}>{name}</label>
            </div>
        })
    }

    render() {
        const { name } = this.props;
        return (<div className="form-group">
            <label htmlFor={name} style={{ "display": "block" }}> Profile Type</label>
            {this.getOptions()}
        </div>);
    }
}

RadioOption.propType = {
    data: PropTypes.array.isRequired
}

export default RadioOption;
