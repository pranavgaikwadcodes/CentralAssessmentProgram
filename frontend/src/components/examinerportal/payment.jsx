import React, { useState, useEffect, useRef } from 'react';
import '../collegeportal/admin/collegeportal.css';
import FormInputs from '../formInputs/formInputs';
import PopUpModal from '../popUp/popUpModal';
import axios from 'axios';

const PaymentPage = () => {
  const [openModel, setOpenModel] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const formRef = useRef(null);

  const handleModalClose = () => {
    setOpenModel(false);
    if (isSuccess) {
      window.location.reload();
    }
  }; 

  const [values, setValues] = useState({
    userID: "",
    name: "",
    email: "",
    phone: "",
    reciever_upiID: "",
  });

  useEffect(() => {
    const examinerId = localStorage.getItem('examinerID');
    const emailFromLocal = localStorage.getItem('email');
    const userID = localStorage.getItem('userID');
    
    fetchPaymentDetails(userID);

    console.log("Email from local storage:", emailFromLocal);
    console.log("Email from local storage:", userID);
    setValues((prevValues) => ({
      ...prevValues,
      email: emailFromLocal,
      userID: userID,
    }));
    if (examinerId) {
      fetchExaminerDetails(examinerId);
    }
  }, []);

  useEffect(() => {
    if (paymentStatus === 'requested') {
      setOpenModel(false);
    }
  }, [paymentStatus]);

  const fetchExaminerDetails = (examinerId) => {
    axios.get(`http://localhost:5000/examinerPortal/examiner/${examinerId}`)
      .then(response => {
        const examinerData = response.data.examiner;
        setValues((prevValues) => ({
          ...prevValues,
          name: examinerData.name || "",
          phone: examinerData.phone || "",
          reciever_upiID: examinerData.UPI_id || "",
        }));
      })
      .catch(error => {
        console.error('Error fetching examiner details:', error);
      });
  };

  const fetchPaymentDetails = (userID) => {
    axios.get(`http://localhost:5000/examinerPortal/examinerPaymentDetail/${userID}`)
      .then(response => {
        const userData = response.data.user;
        console.log("Payment Info: " + userData);
        setPaymentStatus(userData.payment_status || '');
      })
      .catch(error => {
        console.error('Error fetching examiner details:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post(`http://localhost:5000/examinerPortal/RequestPayment`, values)
      .then(response => {
        console.log(response.data);
        setMessage('Payment requested successfully');
        setIsSuccess(true);
        setOpenModel(true);
        setTimeout(() => {
          formRef.current.reset();
        }, 0);
      })
      .catch(error => {
        console.error('Error requesting payment:', error);
        setMessage('Failed to request payment. Please try again.');
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
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
    },
    {
      id: 4,
      name: "reciever_upiID",
      type: "text",
      placeholder: "UPI ID",
      label: "UPI ID",
    },
  ];

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>Request Payment</span>
      </div>

      <div className="body profile-settings-form flex flex-col">
        {paymentStatus === 'requested' ? (
          <div className="profile-settings-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-full mt-10 ">
            <p>You have already requested payment.</p>
          </div>
        ) : 
          // <div className="profile-settings-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-full mt-10 ">
          //   <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill to request payment</div>

          //   <form ref={formRef} onSubmit={handleSubmit}>
          //     {inputs.map(input => (
          //       <FormInputs
          //         key={input.id}
          //         name={input.name}
          //         type={input.type}
          //         placeholder={input.placeholder}
          //         label={input.label}
          //         value={values[input.name]}
          //         onChange={onChange}
          //       />
          //     ))}

          //     <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Request</button>
          //   </form>
          // </div>

          (paymentStatus === 'paid') ? (
            <div className="profile-settings-card card font-inter m-2 p-5 bg-green-100 drop-shadow-2xl w-full mt-10 ">
              <p>You have been Paid. <br></br><span>If you haven't received payment please wait for 24 hrs before taking any actions.</span><br></br><br></br> If you have any issues  please contact us at <span className='font-inter font-light text-blue-600'>support@capx.co.in</span></p>
            </div>
          ) : (
            <div className="profile-settings-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-full mt-10 ">
              <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill to request payment</div>
  
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
  
                <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Request</button>
              </form>
            </div>
          )}
        
      </div>
      
      <PopUpModal open={openModel} onClose={handleModalClose} isSuccess={isSuccess} message={message} />
    </div>
  );
}

export default PaymentPage;
