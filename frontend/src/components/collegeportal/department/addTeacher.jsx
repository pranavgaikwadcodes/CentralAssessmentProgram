import React, { useState } from 'react'
import FormInputs from '../../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { NavLink } from 'react-router-dom';

const AddTeacherPage = () => {
  const [values, setValues] = useState({
    departmentName: "",
    subjectName: "",
    subjectID: "",
    pattern: "",
    HODcollegePhone: "",

    TotalStudents_fisrtYear: "",
    TotalStudents_secondYear: "",
    TotalStudents_thirdYear: "",
    TotalStudents_fourthYear: "",

    totalSubjects_fisrtYear: "",
    totalSubjects_secondYear: "",
    totalSubjects_thirdYear: "",
    totalSubjects_fourthYear: "",

    totalTeachers: "",
  })

  const inputs = [
    {
      id: 1,
      name: "departmentName",
      type: "text",
      placeholder: "Department Name",
      label: "Department Name",
      disabled: true,
    },
    {
      id: 2,
      name: "subjectName",
      type: "text",
      placeholder: "Subject Name",
      label: "Subject Name",
    },
    {
      id: 3,
      name: "subjectID",
      type: "text",
      placeholder: "subjectID / Subject Code",
      label: "subjectID / Subject Code",
    },
    {
      id: 4,
      name: "pattern",
      type: "text",
      placeholder: "Pattern",
      label: "Pattern",
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }


  const radioButtons = [
    {
      id: 5,
      name: "College Type",
      options: [
        { label: "Practical", value: "Practical" },
        { label: "Theory", value: "Theory" },
        { label: "Audit Cource", value: "Audit Cource" },
        { label: "Elective", value: "Elective" },
      ],
    },
  ];

  console.log(values);

  return (
    <div className='m-10 mr-20 content flex flex-col'>

      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>ADD NEW TEACHER</span>
        <NavLink to="../subjects">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <ArrowBackIosIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Back</span>
          </button>
        </NavLink>
      </div>

      <div className="body profile-settings-form flex flex-col">
        <div className="profile-settings-card card font-inter m-2 p-5
         bg-white drop-shadow-2xl w-full mt-32 ">
          <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill to add new Teacher</div>

          <form onSubmit={handleSubmit}>

            {inputs.map((input) => (
              <FormInputs key={input.id} {...input} values={values[input.name]} onChange={onChange} />
            ))}

            <div className='mt-5'>
              <span>Select Subject Type</span>

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

            <button className='mt-12 font-inter font-semibold text-md rounded-lg px-4 py-2 text-white 
               bg-button-blue hover:bg-button-blue-hover w-full'>SAVE</button>


          </form>

        </div>
      </div>

    </div>
  )
}

export default AddTeacherPage