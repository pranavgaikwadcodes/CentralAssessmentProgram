import React, { useState } from 'react';
import FormInputs from '../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    college_name: '',
    college_code: '',
    experience: '',
    branch: '',
    PAN_card_number: '',
    bank_IFSC_code: '',
    bank_account_number: '',
    UPI_id: ''
  });
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Examiner Email',
      label: 'Examiner Email',
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      label: 'Password',
    },
    {
      id: 3,
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      label: 'Name',
    },
    {
      id: 4,
      name: 'phone',
      type: 'tel',
      placeholder: 'Phone Number',
      label: 'Phone Number',
    },
    {
      id: 5,
      name: 'college_name',
      type: 'text',
      placeholder: 'College Name',
      label: 'College Name',
    },
    {
      id: 6,
      name: 'college_code',
      type: 'text',
      placeholder: 'College Code',
      label: 'College Code',
    },
    {
      id: 7,
      name: 'experience',
      type: 'text',
      placeholder: 'Experience',
      label: 'Experience',
    },
    {
      id: 8,
      name: 'branch',
      type: 'text',
      placeholder: 'Branch',
      label: 'Branch',
    },
    {
      id: 9,
      name: 'PAN_card_number',
      type: 'text',
      placeholder: 'PAN Card Number',
      label: 'PAN Card Number',
    },
    {
      id: 10,
      name: 'bank_IFSC_code',
      type: 'text',
      placeholder: 'Bank IFSC Code',
      label: 'Bank IFSC Code',
    },
    {
      id: 11,
      name: 'bank_account_number',
      type: 'text',
      placeholder: 'Bank Account Number',
      label: 'Bank Account Number',
    },
    {
      id: 12,
      name: 'UPI_id',
      type: 'text',
      placeholder: 'UPI ID',
      label: 'UPI ID',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/examinerPortal/registerExaminer", values);
      console.log(response.data);

      // Save examiner details to localStorage
      const { _id, name, email, userID } = response.data.examiner;
      localStorage.setItem('examinerId', _id);
      localStorage.setItem('examinerName', name);
      localStorage.setItem('examinerEmail', email);
      localStorage.setItem('userID', userID);
      
      // Redirect to dashboard or any other desired page
      navigate("/ExaminerPortal/dashboard");
    } catch (error) {
      console.error('Error Registeraion:', error);
      // Handle login error, show an error message or perform any other actions you need
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>REGISTER TO CAP <span className="bg-yellow-300">EXAMINER PORTAL</span> </span>
        <NavLink to="/">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <ArrowBackIosIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Back</span>
          </button>
        </NavLink>
      </div>

      <div className='body register-college-form flex flex-col'>

        <div className="body register-college-form">
          <div className="register-college-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-full mt-32 ">
            <div className="heading font-inter text-xl font-normal mt-3 ml-2">Auth</div>
            <form onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <FormInputs key={input.id} {...input} values={values[input.name]} onChange={onChange} />
              ))}
              <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Register</button>
            </form>
          </div>
        </div>

        <div className="mt-8  hover:cursor-pointer">
          <NavLink to="../examinerlogin" >
            <span className='text-text-blue pt-1.5'>Click here to Login <ArrowOutwardIcon sx={{ fontSize: 18 }} /> </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
