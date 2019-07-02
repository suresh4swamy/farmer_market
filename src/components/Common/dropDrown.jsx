import React, { Component } from 'react';
import PropTypes from "prop-types";

class DropDown extends Component {

    getOptions() {
        return this.props.data.map(function ({ id, name }, index) {
            return <option key={index} value={id}>{name}</option>
        });
    }

    render() {
        const { name, label, onChange, value } = this.props;
        return (<div className="form-group">
            <label htmlFor={name}>{label || name}</label>
            <select className="form-control" id={name} name={name} onChange={onChange} value={value}>
                <option value="">-</option>
                {this.getOptions()}
            </select>
        </div>);
    }

}

DropDown.defaultProps = {
    value: ""
}

DropDown.propTypes = {
    data: PropTypes.array.isRequired
}

export default DropDown;
