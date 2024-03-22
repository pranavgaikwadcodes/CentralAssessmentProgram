import React, { useState } from 'react'
import './collegeportal.css';
import FormInputs from '../../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { NavLink } from 'react-router-dom';

const SettingsPage = () => {
  const [values, setValues] = useState({
    collegeName:"",
    centerID:"",
    phoneNumber:"",
    totalDepartmentsCount:"",
    email:"",
    // Additional state for radio buttons
    collegeType: "Affiliated to SPPU", // Default value
  })

  const inputs = [
    {
      id:1,
      name: "collegeName",
      type: "text",
      placeholder: "College Name",
      lable: "College Name",
    },
    {
      id:2,
      name: "centerID",
      type: "text",
      placeholder: "Center ID",
      lable: "Center ID",
    },
    {
      id:3,
      name: "totalDepartmentsCount",
      type: "text",
      placeholder: "total Departments Count",
      lable: "total Departments Count",
    },
    {
      id:4,
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone Number",
      lable: "Phone Number",
    },
    {
      id:5,
      name: "email",
      type: "email",
      placeholder: "Email",
      lable: "Email",
    },
  ]
  
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  
  const radioButtons = [
    {
      id: 6,
      name: "College Type",
      options: [
        { label: "Affiliated to SPPU", value: "Affiliated to SPPU" },
        { label: "Semi-Affiliated to SPPU", value: "Semi-Affiliated to SPPU" },
      ],
    },
  ];

  console.log(values);

  return (
    <div className='m-10 mr-20 content flex flex-col'>

      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>PROFILE SETTINGS</span>
        <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
          <ArrowBackIosIcon sx={{ fontSize: 18 }} />
          <span className="ml-2">Back</span>
        </button>
      </div>
      
      <div className="body profile-settings-form flex flex-col">
        <div className="profile-settings-card card font-inter m-2 p-5
         bg-white drop-shadow-2xl w-full mt-32 ">
            <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill for set your profile</div>
            
            <form onSubmit={handleSubmit}>
              
                {inputs.map( (input) => (
                  <FormInputs key={input.id} {...input} values={values[input.name]} onChange={onChange} />
                ))}
                
              <div className='mt-5'>
                <span>Select College Type</span>
              
                {radioButtons.map((radioGroup) => (
                  <div key={radioGroup.id} className="mt-2">
                    {radioGroup.options.map((option) => (
                      <label key={option.value} className="inline-flex items-center mr-6">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-blue-600"
                          name={radioGroup.name}
                          value={option.value}
                          checked={values[radioGroup.name] === option.value}
                          onChange={onChange}
                        />
                        <span className="ml-2">{option.label}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>  
              <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white
             bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Update</button>
            </form>
            
            
        </div>

        <div className="mt-8  hover:cursor-pointer">
          <NavLink to="../settings" >
            <span className='text-text-blue pt-1.5'>Click here to change Auth Details <ArrowOutwardIcon sx={{ fontSize: 18 }} /> </span>
          </NavLink>
        </div>
      </div>

    </div>
  )
}

export default SettingsPage