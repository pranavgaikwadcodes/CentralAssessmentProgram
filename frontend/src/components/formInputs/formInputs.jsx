import React from 'react';
import './formInput.css';

const FormInputs = (props) => {
    const {id, lable, onChange, ...inputProps} = props
  return (
    <div className='formInputs'>
        {/* <label htmlFor="">{lable}</label> */}
        <input {...inputProps} onChange={onChange}/>
    </div>
  )
}

export default FormInputs