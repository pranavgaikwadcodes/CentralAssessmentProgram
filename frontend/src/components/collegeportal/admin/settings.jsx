import React, { useState } from 'react'
import './collegeportal.css';
import FormInputs from '../../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { NavLink } from 'react-router-dom';

const SettingsPage = () => {
  const [values, setValues] = useState({
    username:"",
    password:"",
  })

  const inputs = [
    {
      id:1,
      name: "username",
      type: "text",
      placeholder: "Username",
      lable: "Username",
    },
    {
      id:2,
      name: "password",
      type: "password",
      placeholder: "password",
      lable: "password",
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
        <span className={`font-inter font-semibold text-4xl mr-96`}>AUTH SETTINGS</span>
        <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
          <ArrowBackIosIcon sx={{ fontSize: 18 }} />
          <span className="ml-2">Back</span>
        </button>
      </div>
      
      <div className="body register-college-form flex flex-col">
        <div className="register-college-card card font-inter m-2 p-5
         bg-white drop-shadow-2xl w-96 mt-32 ">
            <div className="heading font-inter text-xl font-normal mt-3 ml-2">Make changes in</div>
            
            <form onSubmit={handleSubmit}>
              {/* <FormInputs placeholder="College Username" setUsername={setUsername} /> */}

              {inputs.map( (input) => (
                <FormInputs key={input.id} {...input} values={values[input.name]} onChange={onChange} />
              ))}
              <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white
             bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Update</button>
            </form>
            
            
        </div>

        <div className="mt-8  hover:cursor-pointer">
          <NavLink to="../profileSettings" >
            <span className='text-text-blue pt-1.5'>Click here to set Profile settings <ArrowOutwardIcon sx={{ fontSize: 18 }} /> </span>
          </NavLink>
        </div>
      </div>

    </div>
  )
}

export default SettingsPage