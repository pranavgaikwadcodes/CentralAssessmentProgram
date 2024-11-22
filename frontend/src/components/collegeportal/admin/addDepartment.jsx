import React, { useState , useRef ,useEffect } from 'react';
import './collegeportal.css';
import FormInputs from '../../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; 
import axios from 'axios';
import PopUpModal from '../../popUp/popUpModal';
import { BASE_URL } from '../../../helper/helper';

const AddDepartmentPage = () => {
  
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
    // Get college code from local storage
    const collegeCode = localStorage.getItem('collegeCODE');
    // Update college code in state
    setValues(prevState => ({
      ...prevState,
      college_code: collegeCode
    }));
  }, []);

  const [values, setValues] = useState({
    college_code: "",
    name: "",
    branches: "",
    hod: "",
    hod_email: "",
    hod_contact: "",
    student_count_firstyear: "",
    student_count_secondyear: "",
    student_count_thirdyear: "",
    student_count_fourthyear: "",
    subject_count_firstyear: "",
    subject_count_secondyear: "",
    subject_count_thirdyear: "",
    subject_count_fourthyear: "",
    teachers_count: "",
    department_username: "", 
    department_password: "", 
  });
  
  const inputs = [
    {
      id: 0,
      name: "college_code",
      type: "text",
      placeholder: "college_code",
      label: "college_code",
      isDisabled: true
    },
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Department Name",
      label: "Department Name",
    },
    {
      id: 2,
      name: "branches",
      type: "text",
      placeholder: "Branchs",
      label: "Branchs",
    },
    {
      id: 3,
      name: "hod",
      type: "text",
      placeholder: "HOD Name",
      label: "HOD Name",
    },
    {
      id: 4,
      name: "hod_email",
      type: "text",
      placeholder: "HOD college email",
      label: "HOD college email",
    },
    {
      id: 5,
      name: "hod_contact",
      type: "text",
      placeholder: "HOD college Ph. no",
      label: "HOD college Ph. no",
    },
    {
      id: 6,
      name: "student_count_firstyear",
      type: "text",
      placeholder: "Total Students First Year",
      label: "Total Students First Year",
    },
    {
      id: 7,
      name: "student_count_secondyear",
      type: "text",
      placeholder: "Total Students Second Year",
      label: "Total Students Second Year",
    },
    {
      id: 8,
      name: "student_count_thirdyear",
      type: "text",
      placeholder: "Total Students Third Year",
      label: "Total Students Third Year",
    },
    {
      id: 9,
      name: "student_count_fourthyear",
      type: "text",
      placeholder: "Total Students Fourth Year",
      label: "Total Students Fourth Year",
    },
    {
      id: 10,
      name: "subject_count_firstyear",
      type: "text",
      placeholder: "Total Subjects First Year",
      label: "Total Subjects First Year",
    },
    {
      id: 11,
      name: "subject_count_secondyear",
      type: "text",
      placeholder: "Total Subjects Second Year",
      label: "Total Subjects Second Year",
    },
    {
      id: 12,
      name: "subject_count_thirdyear",
      type: "text",
      placeholder: "Total Subjects Third Year",
      label: "Total Subjects Third Year",
    },
    {
      id: 13,
      name: "subject_count_fourthyear",
      type: "text",
      placeholder: "Total Subjects Fourth Year",
      label: "Total Subjects Fourth Year",
    },
    {
      id: 14,
      name: "teachers_count",
      type: "text",
      placeholder: "Total Teachers",
      label: "Total Teachers",
    },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the backend route '/addDepartment/'
    axios.post(`${BASE_URL}/collegePortal/addDepartment/`, values)
      .then(response => {
        console.log(response.data);
        setMessage('Department Added!'); // Set the success message
        setIsSuccess(true); // Set isSuccess to true
        setOpenModel(true); // Open the modal upon successful college addition
        // Delay form reset until after state updates
        setTimeout(() => {
          formRef.current.reset();
        }, 0);
      })
      .catch(error => {
        console.error('Error adding department:', error);
        setMessage('Failed to Add Department. Please try again.'); // Set the error message
        setIsSuccess(false); // Set isSuccess to false
        setOpenModel(true); // Open the modal upon error
      });

  };

  const generateUsernameAndPassword = (e) => {
    e.preventDefault();
    const { hod, hod_contact } = values;
    let username = hod.replace(/\s+/g, '').toLowerCase(); // Using let instead of const
    username = username.substring(0, 4); // Taking the first four letters
    const lastDigits = hod_contact.slice(-4);
    const password = username + lastDigits;
    setValues({ ...values, department_username: username, department_password: password });
};

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

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
        <div className="profile-settings-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-full mt-20 ">
          <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill to add new department profile</div>
          <form ref={formRef} onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInputs key={input.id} {...input} value={values[input.name]} onChange={onChange} />
            ))}
            <div className="flex flex-col">
              <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white bg-button-blue-hover hover:bg-button-blue mt-5 w-80' onClick={generateUsernameAndPassword}>
                Generate username & pass
              </button>
            </div>
              <FormInputs
                id={15}
                label="Generated Username"
                name="department_username"
                type="text"
                placeholder="Generated Username"
                value={values.department_username}
                onChange={onChange}
                width="w-96"
                isDisabled={true} // Disable the field
              />
              <FormInputs
                id={16}
                label="Generated Password"
                name="department_password"
                type="text"
                placeholder="Generated Password"
                value={values.department_password}
                onChange={onChange}
                width="w-96"
                isDisabled={true} // Disable the field
              />

            <button className='mt-12 font-inter font-semibold text-md rounded-lg px-4 py-2 text-white bg-button-blue hover:bg-button-blue-hover w-full'>
              SAVE DEPARTMENT
            </button>
          </form>
        </div>
      </div>

      <PopUpModal open={openModel} onClose={ handleModalClose } isSuccess={isSuccess} message={message} />

    </div>
  );
}

export default AddDepartmentPage;
