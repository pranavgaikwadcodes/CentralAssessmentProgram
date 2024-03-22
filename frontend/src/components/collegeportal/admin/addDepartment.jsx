import React, { useState } from 'react'
import './collegeportal.css';
import FormInputs from '../../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { NavLink } from 'react-router-dom';

const AddDepartmentPage = () => {
  const [values, setValues] = useState({
    departmentName:"",
    branch:"",
    HODname:"",
    HODcollegeemail:"",
    HODcollegePhone:"",

    TotalStudents_fisrtYear:"",
    TotalStudents_secondYear:"",
    TotalStudents_thirdYear:"",
    TotalStudents_fourthYear:"",

    totalSubjects_fisrtYear:"",
    totalSubjects_secondYear:"",
    totalSubjects_thirdYear:"",
    totalSubjects_fourthYear:"",

    totalTeachers:"",
  })

  const inputs = [
    {
      id:1,
      name: "departmentName",
      type: "text",
      placeholder: "Department Name",
      label: "Department Name",
    },
    {
      id:2,
      name: "branch",
      type: "text",
      placeholder: "Branch",
      label: "Branch",
    },
    {
      id:3,
      name: "HODname",
      type: "text",
      placeholder: "HOD Name",
      label: "HOD Name",
    },
    {
      id:4,
      name: "HODcollegeemail",
      type: "text",
      placeholder: "HOD college email",
      label: "HOD college email",
    },
    {
      id:5,
      name: "HODcollegePhone",
      type: "text",
      placeholder: "HOD college Ph. no",
      label: "HOD college Ph. no",
    },
    {
      id:6,
      name: "TotalStudents_firstYear",
      type: "text",
      placeholder: "Total Students First Year",
      label: "Total Students First Year",
    },
    {
      id:7,
      name: "TotalStudents_secondYear",
      type: "text",
      placeholder: "Total Students Second Year",
      label: "Total Students Second Year",
    },
    {
      id:8,
      name: "TotalStudents_thirdYear",
      type: "text",
      placeholder: "Total Students Third Year",
      label: "Total Students Third Year",
    },
    {
      id:9,
      name: "TotalStudents_fourthYear",
      type: "text",
      placeholder: "Total Students Fourth Year",
      label: "Total Students Fourth Year",
    },
    {
      id:10,
      name: "totalSubjects_firstYear",
      type: "text",
      placeholder: "Total Subjects First Year",
      label: "Total Subjects First Year",
    },
    {
      id:11,
      name: "totalSubjects_secondYear",
      type: "text",
      placeholder: "Total Subjects Second Year",
      label: "Total Subjects Second Year",
    },
    {
      id:12,
      name: "totalSubjects_thirdYear",
      type: "text",
      placeholder: "Total Subjects Third Year",
      label: "Total Subjects Third Year",
    },
    {
      id:13,
      name: "totalSubjects_fourthYear",
      type: "text",
      placeholder: "Total Subjects Fourth Year",
      label: "Total Subjects Fourth Year",
    },
    {
      id:14,
      name: "totalTeachers",
      type: "text",
      placeholder: "Total Teachers",
      label: "Total Teachers",
    },
    {
      id:15,
      name: "username",
      type: "text",
      placeholder: "Generated Username",
      label: "Generated Username",
      disabled: true, // Set to true to disable the field
      width: "w-96"
    },
    {
      id:16,
      name: "password",
      type: "text",
      placeholder: "Generated Password",
      label: "Generated Password",
      disabled: true, // Set to true to disable the field
      width: "w-96"
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
        <span className={`font-inter font-semibold text-4xl mr-96`}>ADD DEPARTMENT</span>
        <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
          <ArrowBackIosIcon sx={{ fontSize: 18 }} />
          <span className="ml-2">Back</span>
        </button>
      </div>
      
      <div className="body profile-settings-form flex flex-col">
        <div className="profile-settings-card card font-inter m-2 p-5
         bg-white drop-shadow-2xl w-full mt-32 ">
            <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill to add new department profile</div>
            
            <form onSubmit={handleSubmit}>
              
                {inputs.map( (input) => (
                  <FormInputs key={input.id} {...input} values={values[input.name]} onChange={onChange} />
                ))}

              <div className="flex flex-col">
                  <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white
                bg-button-blue-hover hover:bg-button-blue mt-5 w-80'>Generate username & pass</button>
              </div>

              <button className='mt-12 font-inter font-semibold text-md rounded-lg px-4 py-2 text-white 
               bg-button-blue hover:bg-button-blue-hover w-full'>SAVE DEPARTMENT</button>


            </form>

        </div>
      </div>

    </div>
  )
}

export default AddDepartmentPage