import React from 'react';
import PropTypes from "prop-types";

const TextInput = ({ name, value, label, onChange, type }) => {
    return (<div className="form-group">
        <label htmlFor={name}>{label || name}</label>
        <input className="form-control" name={name} value={value} onChange={onChange} type={type} />
    </div>);
}

TextInput.defaultProps = {
    type: "text"
}
TextInput.propTypes = {
    value: PropTypes.string.isRequired
}

export default TextInput;