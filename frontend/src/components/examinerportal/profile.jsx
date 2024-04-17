import React, { useState, useEffect, useRef } from 'react';
import '../collegeportal/admin/collegeportal.css';
import FormInputs from '../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { NavLink } from 'react-router-dom';
import PopUpModal from '../popUp/popUpModal';
import axios from 'axios';

const ProfilePage = () => {
  const [openModel, setOpenModel] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const handleModalClose = () => {
    setOpenModel(false);
    if (isSuccess) {
      window.location.reload();
    }
  }; 

  const [values, setValues] = useState({
    name: "",
    phone: "",
    college_name: "",
    college_code: "",
    experience: "",
    branch: "",
    PAN_card_number: "",
    bank_IFSC_code: "",
    bank_account_number: "",
    UPI_id: "",
  });

  useEffect(() => {
    const examinerId = localStorage.getItem('examinerID');
    if (examinerId) {
      fetchExaminerDetails(examinerId);
    }
  }, []);

  const fetchExaminerDetails = (examinerId) => {
    axios.get(`http://localhost:5000/examinerPortal/examiner/${examinerId}`)
      .then(response => {
        const examinerData = response.data.examiner;
        setValues({
          name: examinerData.name || "",
          phone: examinerData.phone || "",
          college_name: examinerData.college_name || "",
          college_code: examinerData.college_code || "",
          experience: examinerData.experience || "",
          branch: examinerData.branch || "",
          PAN_card_number: examinerData.PAN_card_number || "",
          bank_IFSC_code: examinerData.bank_IFSC_code || "",
          bank_account_number: examinerData.bank_account_number || "",
          UPI_id: examinerData.UPI_id || "",
        });
      })
      .catch(error => {
        console.error('Error fetching examiner details:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:5000/examinerPortal/updateProfile/${localStorage.getItem('examinerID')}`, [
      { propName: "name", value: values.name },
      { propName: "phone", value: values.phone },
      { propName: "college_name", value: values.college_name },
      { propName: "college_code", value: values.college_code },
      { propName: "experience", value: values.experience },
      { propName: "branch", value: values.branch },
      { propName: "PAN_card_number", value: values.PAN_card_number },
      { propName: "bank_IFSC_code", value: values.bank_IFSC_code },
      { propName: "bank_account_number", value: values.bank_account_number },
      { propName: "UPI_id", value: values.UPI_id },
    ])
      .then(response => {
        console.log(response.data);
        setMessage('Profile Updated!');
        setIsSuccess(true);
        setOpenModel(true);
        setTimeout(() => {
          formRef.current.reset();
        }, 0);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        setMessage('Failed to Update. Please try again.');
        setIsSuccess(false);
        setOpenModel(true);
      });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
      name: "phone",
      type: "text",
      placeholder: "Phone Number",
      label: "Phone Number",
    },
    {
      id: 3,
      name: "college_name",
      type: "text",
      placeholder: "College Name",
      label: "College Name",
    },
    {
      id: 4,
      name: "college_code",
      type: "text",
      placeholder: "College Code",
      label: "College Code",
    },
    {
      id: 5,
      name: "experience",
      type: "text",
      placeholder: "Experience",
      label: "Experience",
    },
    {
      id: 6,
      name: "branch",
      type: "text",
      placeholder: "Branch",
      label: "Branch",
    },
    {
      id: 7,
      name: "PAN_card_number",
      type: "text",
      placeholder: "PAN Card Number",
      label: "PAN Card Number",
    },
    {
      id: 8,
      name: "bank_IFSC_code",
      type: "text",
      placeholder: "Bank IFSC Code",
      label: "Bank IFSC Code",
    },
    {
      id: 9,
      name: "bank_account_number",
      type: "text",
      placeholder: "Bank Account Number",
      label: "Bank Account Number",
    },
    {
      id: 10,
      name: "UPI_id",
      type: "text",
      placeholder: "UPI ID",
      label: "UPI ID",
    },
  ];

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>PROFILE SETTINGS</span>
      </div>

      <div className="body profile-settings-form flex flex-col">
        <div className="profile-settings-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-full mt-10 ">
          <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill for set your profile</div>

          <form ref={formRef} onSubmit={handleSubmit}>
            {inputs.map(input => (
              <FormInputs
                key={input.id}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                label={input.label}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}

            <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Update</button>
          </form>
        </div>

      </div>
      
      <PopUpModal open={openModel} onClose={handleModalClose} isSuccess={isSuccess} message={message} />
    </div>
  );
}

export default ProfilePage;
