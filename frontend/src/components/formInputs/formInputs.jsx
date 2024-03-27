import React from 'react';
import './formInput.css';

const FormInputs = (props) => {
  const { id, label, onChange, width, isDisabled, value, ...inputProps } = props;
  const disabledAttribute = isDisabled ? { disabled: true } : {};
  
  return (
    <div className={`formInputs ${width}`}>
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} onChange={onChange} value={value} {...disabledAttribute} required />
    </div>
  );
};

export default FormInputs;
