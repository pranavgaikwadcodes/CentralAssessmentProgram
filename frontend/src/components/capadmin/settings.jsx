import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';
import FormInputs from '../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const SettingsPage = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [adminId, setAdminId] = useState(""); // State to store admin ID
  const [loading, setLoading] = useState(true); // State to track loading state

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "password",
      label: "password",
    },
  ];

  useEffect(() => {
    // Retrieve admin data from backend when the component mounts
    axios.get("http://localhost:5000/admin/")
      .then(response => {
        console.log("Admin data:", response.data); // Log the response data
        const adminData = response.data[0]; // Assuming there's only one admin, adjust as needed
        if (adminData) {
          console.log("admin user: " + adminData.username);
          setValues(prevState => ({
            ...prevState,
            username: adminData.username // Set the username in the state
          }));
          setAdminId(adminData._id); // Set the admin ID in the state
        }
      })
      .catch(error => {
        console.error("Error fetching admin data:", error); // Log any errors
      })
      .finally(() => {
        setLoading(false); // Update loading state after fetching data
      });
  }, []); // Run this effect only once on component mount
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    for (const field of Object.values(values)) {
      if (field.trim() === "") {
        console.error("All fields are required");
        // Handle the error, display an error message, or perform any other actions
        return; // Exit the function early if any field is empty
      }
    }

    try {
      const response = await axios.patch(`http://localhost:5000/admin/updateAdminAuth/${adminId}`, values);
      console.log(response.data); // Log the response from the server
      // Handle success, show a success message or perform any other actions you need
    } catch (error) {
      console.error('Error updating admin:', error);
      // Handle error, show an error message or perform any other actions you need
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading indicator while fetching data
  }

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>AUTH SETTINGS</span>
        <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
          <ArrowBackIosIcon sx={{ fontSize: 18 }} />
          <span className="ml-2">Back</span>
        </button>
      </div>
      <div className="body register-college-form">
        <div className="register-college-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-96 mt-32 ">
          <div className="heading font-inter text-xl font-normal mt-3 ml-2">Make changes in</div>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInputs key={input.id} {...input} values={values[input.name]} onChange={onChange} />
            ))}
            <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
