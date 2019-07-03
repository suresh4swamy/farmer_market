import React from 'react';
import PropTypes from "prop-types";

const TextArea = ({ name, value, label, onChange, type }) => {
    return (<div className="form-group">
        <label htmlFor={name}>{label || name}</label>
        <textarea className="form-control" name={name} value={value} onChange={onChange} type={type} ></textarea>
    </div>);
}

TextArea.defaultProps = {
    type: "text"
}
TextArea.propTypes = {
    value: PropTypes.string.isRequired
}

export default TextArea;