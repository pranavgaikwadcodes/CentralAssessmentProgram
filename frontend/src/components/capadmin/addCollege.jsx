import React, { useState, useRef } from 'react'
import './DashboardPage.css';
import FormInputs from '../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import PopUpModal from '../popUp/popUpModal';

const AddCollege = () => {

  // Used for pop up 
  const [openModel, setOpenModel] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef(null); // Reference to the form element

  const [values, setValues] = useState({
    name: "",
    center_code: "",
    college_type: "Affiliated to SPPU", // Set the default value here
    college_departments_count: "",
    address: "",
    contact: "",
    email: "",
    password: "",
  });

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
      name: "center_code",
      type: "text",
      placeholder: "Center Code",
      label: "Center Code",
    },

    {
      id: 4,
      name: "college_departments_count",
      type: "text",
      placeholder: "College Departments Count",
      label: "College Departments Count",
    },
    {
      id: 5,
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
    },
    {
      id: 6,
      name: "contact",
      type: "text",
      placeholder: "Contact",
      label: "Contact",
    },
    {
      id: 7,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
    },
    {
      id: 8,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
    },
  ];

  const radioButtons = [
    {
      id: 6,
      name: "collegeType",
      options: [
        { label: "Affiliated to SPPU", value: "Affiliated to SPPU" },
        { label: "Semi-Affiliated to SPPU", value: "Semi-Affiliated to SPPU" },
      ],
    },
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Make Axios POST request
  //   axios.post('http://localhost:5000/admin/addCollege/', values)
  //     .then(response => {
  //       console.log(response.data);
  //       setMessage('College added successfully!'); // Set the success message
  //       setIsSuccess(true); // Set isSuccess to true
  //       setOpenModel(true); // Open the modal upon successful college addition
  //       // Delay form reset until after state updates
  //       setTimeout(() => {
  //         formRef.current.reset();
  //       }, 0);
  //       // Reset all input fields
  //       setValues({
  //         name: "",
  //         center_code: "",
  //         college_type: "Affiliated to SPPU",
  //         college_departments_count: "",
  //         address: "",
  //         contact: "",
  //         email: "",
  //         password: "",
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Error adding college:', error);
  //       setMessage('Failed to add college. Please try again.'); // Set the error message
  //       setIsSuccess(false); // Set isSuccess to false
  //       setOpenModel(true); // Open the modal upon error
  //       // Handle error here
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Make Axios POST request
    axios.post('http://localhost:5000/admin/addCollege/', values)
      .then(response => {
        console.log(response.data);
        setMessage('College added successfully!'); // Set the success message
        setIsSuccess(true); // Set isSuccess to true
        setOpenModel(true); // Open the modal upon successful college addition
        // Delay form reset until after state updates
        setTimeout(() => {
          formRef.current.reset();
        }, 0);
        // Reset all input fields
        setValues({
          name: "",
          center_code: "",
          college_type: "Affiliated to SPPU",
          college_departments_count: "",
          address: "",
          contact: "",
          email: "",
          password: "",
        });
      })
      .catch(error => {
        console.error('Error adding college:', error);
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          // Display the error message from the server response
          setMessage(error.response.data.error || 'Failed to add college. Please try again.');
        } else if (error.request) {
          // The request was made but no response was received
          setMessage('No response received from server. Please try again later.');
        } else {
          // Something happened in setting up the request that triggered an Error
          setMessage('An unexpected error occurred. Please try again.');
        }
        setIsSuccess(false); // Set isSuccess to false
        setOpenModel(true); // Open the modal upon error
        // Handle error here
      });
  };
  

  const handleChange = (e) => {
    // Update the state with the selected value
    setValues({ ...values, college_type: e.target.value });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleModalClose = () => {
    setOpenModel(false);
    if (isSuccess) {
      // Reload the page when modal is closed and isSuccess is true
      window.location.reload();
    }
  };

  console.log(values);

  return (
    <div className='m-10 mr-20 content flex flex-col'>

      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>ADD NEW COLLEGE</span>
        <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
          <ArrowBackIosIcon sx={{ fontSize: 18 }} />
          <span className="ml-2">Back</span>
        </button>
      </div>

      <div className="body register-college-form">
        <div className="register-college-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl w-9/12 mt-10 ">
          <div className="heading font-inter text-xl font-normal mt-3 ml-2">Set Credentials</div>

          <form ref={formRef} onSubmit={handleSubmit}>
            {/* <FormInputs placeholder="College Username" setUsername={setUsername} /> */}

            {inputs.map((input) => (
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
                        checked={values.college_type === option.value} // Check if the option matches the current college_type
                        onChange={handleChange} // Set handleChange here to update college_type
                      />
                      <span className="ml-2">{option.label}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>

            <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white
              bg-button-blue hover:bg-button-blue-hover mt-5 w-fit'>Submit</button>
          </form>

        </div>
      </div>

      <PopUpModal open={openModel} onClose={ handleModalClose } isSuccess={isSuccess} message={message} />

    </div>
  )
}

export default AddCollege
