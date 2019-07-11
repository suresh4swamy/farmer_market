import React from 'react';
import PropTypes from "prop-types";

const TextInput = ({ name, value, label, onChange, type, className = "", ...rest }) => {
    return (<div className={"form-group " + className}>
        <label htmlFor={name}>{label || name}</label>
        <input className="form-control" name={name} value={value} onChange={onChange} type={type} {...rest} />
    </div>);
}

TextInput.defaultProps = {
    type: "text"
}
TextInput.propTypes = {
    value: PropTypes.string.isRequired
}

export default TextInput;