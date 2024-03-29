// import React from 'react';
// import './formInput.css';

// const FormInputs = (props) => {
//   const { id, label, onChange, width, isDisabled, value, ...inputProps } = props;
//   const disabledAttribute = isDisabled ? { disabled: true } : {};
  
//   return (
//     <div className={`formInputs ${width}`}>
//       <label htmlFor={id}>{label}</label>
//       <input {...inputProps} onChange={onChange} value={value} {...disabledAttribute} required />
//     </div>
//   );
// };

// export default FormInputs;

import React, { useEffect, useState } from 'react';
import './formInput.css';

const FormInputs = ({ id, label, onChange, width, isDisabled, value, ...inputProps }) => {
  const [inputValue, setInputValue] = useState(value);
  
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };
  
  const disabledAttribute = isDisabled ? { disabled: true } : {};

  return (
    <div className={`formInputs ${width}`}>
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        id={id}
        value={inputValue}
        onChange={handleChange}
        {...disabledAttribute}
        required
      />
    </div>
  );
};

export default FormInputs;
