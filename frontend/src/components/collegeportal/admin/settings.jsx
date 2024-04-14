import React, { useState , useRef } from 'react'
import './collegeportal.css';
import FormInputs from '../../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { NavLink } from 'react-router-dom';
import PopUpModal from '../../popUp/popUpModal';
import axios from 'axios';

const SettingsPage = () => {
  
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

  const [values, setValues] = useState({
    email:"",
    password:"",
  })

  const inputs = [
    {
      id:1,
      name: "email",
      type: "text",
      placeholder: "Email",
      lable: "Email",
    },
    {
      id:2,
      name: "password",
      type: "password",
      placeholder: "Password",
      lable: "Password",
    },
  ]
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:5000/collegePortal/updateCollege/65ff10fee8c642085f6b699d`, [
      { propName: "email", value: values.email },
      { propName: "password", value: values.password },
    ])
    .then(response => {
      console.log(response.data);
      setMessage('Auth Details Updated!'); // Set the success message
        setIsSuccess(true); // Set isSuccess to true
        setOpenModel(true); // Open the modal upon successful college addition
        // Delay form reset until after state updates
        setTimeout(() => {
          formRef.current.reset();
        }, 0);
        // Reset all input fields
    })
    .catch(error => {
      console.error('Error updating Auth Details:', error);
      setMessage('Failed to Update Auth Details. Please try again.'); // Set the error message
        setIsSuccess(false); // Set isSuccess to false
        setOpenModel(true); // Open the modal upon error
    });
  };

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  console.log(values);

  return (
    <div className='m-10 mr-20 content flex flex-col'>

      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>AUTH SETTINGS</span>
        
      </div>
      
      <div className="body register-college-form flex flex-col">
        <div className="register-college-card card font-inter m-2 p-5
         bg-white drop-shadow-2xl w-96 mt-32 ">
            <div className="heading font-inter text-xl font-normal mt-3 ml-2">Make changes in</div>
            
            <form ref={formRef} onSubmit={handleSubmit}>
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

      <PopUpModal open={openModel} onClose={ handleModalClose } isSuccess={isSuccess} message={message} />

    </div>
  )
}

export default SettingsPage