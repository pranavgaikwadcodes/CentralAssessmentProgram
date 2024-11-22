import React, { useState , useRef ,useEffect } from 'react';
import FormInputs from '../../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PopUpModal from '../../popUp/popUpModal';
import { BASE_URL } from '../../../helper/helper';

const AddTeacherPage = () => {

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
      college_code: collegeCode, // Corrected from 'collegeCode'
      department: departmentName, // Corrected from 'departmentName'
    }));
  }, []); 

  const [values, setValues] = useState({
    college_code: "",
    department: "", 
    name: "",
    designation: "",
    college_email: "",
    contact: "",
  })

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
    },
    {
      id: 2,
      name: "designation",
      type: "text",
      placeholder: "designation",
      label: "designation",
    },
    {
      id: 3,
      name: "college_email",
      type: "text",
      placeholder: "College Email",
      label: "College Email",
    },
    {
      id: 4,
      name: "contact",
      type: "text",
      placeholder: "Contact",
      label: "Contact",
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/collegePortal/addTeacher`, values);
      console.log(response.data);
      setMessage('Teacher Added!'); // Set the success message
      setIsSuccess(true); // Set isSuccess to true
      setOpenModel(true); // Open the modal upon successful college addition
      // Delay form reset until after state updates
      setTimeout(() => {
        formRef.current.reset();
      }, 0);
    } catch (error) {
      console.error('Error adding Teacher:', error);
      setMessage('Failed to Add Teacher. Please try again.'); // Set the error message
      setIsSuccess(false); // Set isSuccess to false
      setOpenModel(true); // Open the modal upon error
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  console.log(values);

  return (
    <div className='m-10 mr-20 content flex flex-col'>

      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>ADD NEW TEACHER</span>
        <NavLink to="../teachers">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <ArrowBackIosIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Back</span>
          </button>
        </NavLink>
      </div>

      <div className="body profile-settings-form flex flex-col">
        <div className="profile-settings-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-full mt-14 ">
          <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill to add new Teacher</div>

          <form ref={formRef} onSubmit={handleSubmit}>
              <FormInputs
                id={15}
                label="College Code"
                name="college_code"
                type="text"
                placeholder="College Code"
                value={values.college_code}
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

            <button className='mt-12 font-inter font-semibold text-md rounded-lg px-4 py-2 text-white 
               bg-button-blue hover:bg-button-blue-hover w-full'>SAVE</button>


          </form>

        </div>
      </div>

      <PopUpModal open={openModel} onClose={handleModalClose} isSuccess={isSuccess} message={message} />

    </div>
  )
}

export default AddTeacherPage
