import React, { useState, useEffect, useRef } from 'react';
import '../collegeportal/admin/collegeportal.css';
import FormInputs from '../formInputs/formInputs';
import PopUpModal from '../popUp/popUpModal';
import axios from 'axios';
import CardPage from './card';
import AssignedBundles from './assignedBundles';

const IssueCardPage = () => {
  const [openModel, setOpenModel] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const [hasCard, setHasCard] = useState(false); // State to track if the user has a card

  const handleModalClose = () => {
    setOpenModel(false);
    if (isSuccess) {
      window.location.reload();
    }
  };

  const [values, setValues] = useState({
    userID: "",
    name: "",
    phone: "",
    email: "",
    role: "examiner",
    card_number: "",
    card_issue_date_time: "", // Default to current date and time
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
          userID: examinerData.userID || "",
          name: examinerData.name || "",
          email: examinerData.email || "",
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
        // Check if the user has a card
        if (examinerData.card_number) {
          setValues({
            card_number: examinerData.cardNumber || "",
          })
          setHasCard(true);

        }
      })
      .catch(error => {
        console.error('Error fetching examiner details:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set the current date in Indian Standard Time
    const currentDate = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });

    // Set the values including the formatted date
    const updatedValues = {
      ...values,
      card_issue_date_time: currentDate, // Corrected from card_issue_date to card_issue_date_time
    };

    // Send the Axios request to add the card
    axios.post(`http://localhost:5000/examinerPortal/addCard`, updatedValues)
      .then(response => {
        // Once the card is successfully added, update the profile with the card number
        const cardNumber = response.data.Card_Details.card_number;

        // Send the Axios request to update the profile with the card number
        axios.patch(`http://localhost:5000/examinerPortal/updateProfile/${localStorage.getItem('examinerID')}`,
          [{ propName: "card_number", value: cardNumber }]
        )
          .then(updateResponse => {
            console.log(updateResponse.data);
            setMessage('Card Added Successfully and Profile Updated!');
            setIsSuccess(true);
            setOpenModel(true);
            setTimeout(() => {
              formRef.current.reset();
            }, 0);
          })
          .catch(updateError => {
            console.error('Error updating profile:', updateError);
            setMessage('Card Added Successfully but Failed to Update Profile. Please try again.');
            setIsSuccess(false);
            setOpenModel(true);
          });
      })
      .catch(error => {
        console.error('Error adding card:', error);
        setMessage('Failed to add card. Please try again.');
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
      isDisabled: true
    },
    {
      id: 2,
      name: "phone",
      type: "text",
      placeholder: "Phone Number",
      label: "Phone Number",
      isDisabled: true
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      isDisabled: true
    },
    {
      id: 4,
      name: "userID",
      type: "text",
      placeholder: "userID",
      label: "userID",
      isDisabled: true
    },
  ];

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>ISSUE CARD</span>
      </div>

      {!hasCard ? ( // Render the form if the user doesn't have a card
        <div className="body profile-settings-form flex flex-col">
          <div className="profile-settings-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-full mt-10 ">
            <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill to issue card</div>

            <form ref={formRef} onSubmit={handleSubmit}>
              {inputs.map(input => (
                <FormInputs key={input.id} {...input} value={values[input.name]} onChange={onChange} />
              ))}

              <button className='font-inter font-semibold text-md rounded-lg px-4 py-2 text-white bg-button-blue hover:bg-button-blue-hover mt-5 w-full'>Get Card</button>
            </form>
          </div>

        </div>
      ) : (
        <>
          <CardPage />
          <AssignedBundles cardNumber={localStorage.getItem('userID')} />
        </>
      )}
      <PopUpModal open={openModel} onClose={handleModalClose} isSuccess={isSuccess} message={message} />
    </div>
  );
}

export default IssueCardPage;
