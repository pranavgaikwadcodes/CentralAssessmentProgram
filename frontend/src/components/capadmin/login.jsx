import React, { useState } from 'react';
import './DashboardPage.css';
import FormInputs from '../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "ADMIN Username",
      label: "ADMIN Username",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "password",
      label: "password",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/loginAdmin", values);
      const { token, adminID } = response.data;

      // Store the token and adminID in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("adminID", adminID);

      // Redirect to dashboard or any other desired page
      navigate("/CAPADMIN/dashboard");
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error, show an error message or perform any other actions you need
      setError("Invalid username or password");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError(null);
  };

  console.log(values);

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>LOGIN TO <span className="bg-yellow-300">CAP ADMIN</span> </span>
        <NavLink to="/">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <ArrowBackIosIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Back</span>
          </button>
        </NavLink>
      </div>
      <div className="body register-college-form flex flex-col items-center">
        <div className="register-college-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-96 mt-32 ">
          <div className="heading font-inter text-xl font-normal mt-3 ml-2">Auth</div>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInputs key={input.id} {...input} values={values[input.name]} onChange={onChange} />
            ))}
            <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Login</button>
          </form>
        </div>
        {error && <div className="text-red-500 font-inter mt-5 ml-2">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
