import React, { useState, useRef, useEffect } from 'react';
import FormInputs from '../../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PopUpModal from '../../popUp/popUpModal';

const AddSubjectPage = () => {

  // Used for pop up 
  const [openModel, setOpenModel] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef(null); // Reference to the form element

  const handleModalClose = () => {
    setOpenModel(false);
    if (isSuccess) {
      // Reload the page when modal is closed and isSuccess is true
      window.location.reload();
    }
  };

  useEffect(() => {
    // Get college code and department name from local storage
    const collegeCode = localStorage.getItem('college_code');
    const departmentName = localStorage.getItem('departmentName');

    // Update college code and department name in state
    setValues(prevState => ({
      ...prevState,
      collegeCode: collegeCode, // Corrected from 'collegeCode'
      department: departmentName, // Corrected from 'departmentName'
    }));
  }, []);

  const [values, setValues] = useState({
    collegeCode: "",
    department: "",
    subject_name: "",
    subject_code: "",
    pattern: "",
    subject_type: "",
  })

  const inputs = [
    {
      id: 1,
      name: "subject_name",
      type: "text",
      placeholder: "Subject Name",
      label: "Subject Name",
    },
    {
      id: 2,
      name: "subject_code",
      type: "text",
      placeholder: "subjectID / Subject Code",
      label: "subjectID / Subject Code",
    },
    {
      id: 3,
      name: "pattern",
      type: "text",
      placeholder: "Pattern",
      label: "Pattern",
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/collegePortal/addSubject", values);
      console.log(response.data);
      setMessage('Subject Added!'); // Set the success message
      setIsSuccess(true); // Set isSuccess to true
      setOpenModel(true); // Open the modal upon successful college addition
      // Delay form reset until after state updates
      setTimeout(() => {
        formRef.current.reset();
      }, 0);
    } catch (error) {
      console.error('Error adding Subject:', error);
      setMessage('Failed to Add Subject. Please try again.'); // Set the error message
      setIsSuccess(false); // Set isSuccess to false
      setOpenModel(true); // Open the modal upon error
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }


  const radioButtons = [
    {
      id: 5,
      name: "subject_type",
      options: [
        // { label: "Practical", value: "Practical" },
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
        <span className={`font-inter font-semibold text-4xl mr-96`}>ADD NEW SUBJECT</span>
        <NavLink to="../subjects">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <ArrowBackIosIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Back</span>
          </button>
        </NavLink>
      </div>

      <div className="body profile-settings-form flex flex-col">
        <div className="profile-settings-card card font-inter m-2 p-5
         bg-white drop-shadow-2xl w-full mt-14 ">
          <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill to add new Subject</div>

          <form ref={formRef} onSubmit={handleSubmit}>

            <FormInputs
              id={15}
              label="College Code"
              name="collegeCode"
              type="text"
              placeholder="College Code"
              value={values.collegeCode}
              onChange={onChange}
              width="w-96"
              isDisabled={true} // Disable the field
            />
            <FormInputs
              id={16}
              label="Department Name"
              name="department"
              type="text"
              placeholder="Department Name"
              value={values.department}
              onChange={onChange}
              width="w-96"
              isDisabled={true} // Disable the field
            />

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
               bg-button-blue hover:bg-button-blue-hover w-full'>SAVE SUBJECT</button>


          </form>

        </div>
      </div>

      <PopUpModal open={openModel} onClose={handleModalClose} isSuccess={isSuccess} message={message} />

    </div>
  )
}

export default AddSubjectPage