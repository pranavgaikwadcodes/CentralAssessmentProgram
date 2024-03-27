import React from 'react';
import './formInput.css';

const FormInputs = (props) => {
    const {id, lable, onChange, width, isdisabled, ...inputProps} = props
    const disabledAttribute = props.disabled ? { disabled: true } : {};
  return (
    <div className={`formInputs ${width}`}>
        {/* <label htmlFor="">{lable}</label> */}
        <input {...inputProps} onChange={onChange} {...disabledAttribute} required/>
    </div>
  )
}

export default FormInputs