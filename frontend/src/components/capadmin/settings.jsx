import React, { useState } from 'react'
import './DashboardPage.css';
import FormInputs from '../formInputs/formInputs';
import AddIcon from '@mui/icons-material/Add';

const SettingsPage = () => {
  const [values, setValues] = useState({
    collegeUsername:"",
    collegeEmail:"",
    password:"",
    confirmPassword:"",
  })

  const inputs = [
    {
      id:1,
      name: "collegeUsername",
      type: "text",
      placeholder: "College Username",
      lable: "College Username",
    },
    {
      id:2,
      name: "collegeEmail",
      type: "email",
      placeholder: "College Email",
      lable: "College Email",
    },
    {
      id:3,
      name: "password",
      type: "password",
      placeholder: "password",
      lable: "password",
    },
    {
      id:4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      lable: "Confirm Password",
    },
  ]
  
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  console.log(values);

  return (
    <div className='m-10 mr-20 content flex flex-col'>

      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>ADD NEW COLLEGE</span>
        <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
          <AddIcon sx={{ fontSize: 18 }} />
          <span className="ml-2">Back</span>
        </button>
      </div>
      
      <div className="body register-college-form">
        <div className="register-college-card card font-inter m-2 p-5
         bg-white drop-shadow-2xl w-96 mt-32 ">
            <div className="heading font-inter text-xl font-normal mt-3 ml-2">Set Credentials</div>
            
            <form onSubmit={handleSubmit}>
              {/* <FormInputs placeholder="College Username" setUsername={setUsername} /> */}

              {inputs.map( (input) => (
                <FormInputs key={input.id} {...input} values={values[input.name]} onChange={onChange} />
              ))}
              <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white
             bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Submit</button>
            </form>
            
            
        </div>
      </div>

    </div>
  )
}

export default SettingsPage