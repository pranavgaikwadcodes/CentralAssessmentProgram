import React, { useState, useRef, useEffect } from 'react';
import FormInputs from '../../formInputs/formInputs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PopUpModal from '../../popUp/popUpModal'; 


const AddSubjectPage = () => {

  // Used for pop up 
  const [openModel, setOpenModel] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef(null); // Reference to the form element

  const [examiners, setExaminers] = useState([]); // State to hold examiners
  const [selectedExaminer, setSelectedExaminer] = useState(''); // State to hold selected examiner UserID

  const handleModalClose = () => {
    setOpenModel(false);
    if (isSuccess) {
      // Reload the page when modal is closed and isSuccess is true
      window.location.reload();
    }
  };

  useEffect(() => {
    // Fetch examiners when component mounts
    fetchExaminers('examiner'); // Provide the role value as needed
  }, []);

  // Function to fetch examiners based on role
  const fetchExaminers = async (role) => {
    try {
      const response = await axios.get(`http://localhost:5000/collegePortal/examiners/${role}`);
      setExaminers(response.data.examiners);
    } catch (error) {
      console.error('Error fetching examiners:', error);
    }
  };

  useEffect(() => {
    // Get college code and department name from local storage
    const collegeCode = localStorage.getItem('college_code');
    const departmentName = localStorage.getItem('departmentName');

    // Update college code and department name in state
    setValues(prevState => ({
      ...prevState,
      collegeCode: collegeCode, // Corrected from 'collegeCode'
      department: departmentName, // Corrected from 'departmentName'
    }));
  }, []);

  const [values, setValues] = useState({
    collegeCode: "",
    department: "",
    subject: "",
    subjectCode: "",
    pattern: "",
    subject_type: "",
    bundle_ID: "",
    bundle_number: "",
    number_of_bundles_for_this_subject: "",
    number_of_papers_in_bundle: "",
    assigned_to: "",
  })

  const inputs = [
    {
      id: 1,
      name: "subject",
      type: "text",
      placeholder: "Subject Name",
      label: "Subject Name",
    },
    {
      id: 2,
      name: "subjectCode",
      type: "text",
      placeholder: "subjectID / Subject Code",
      label: "subjectID / Subject Code",
    },
    {
      id: 3,
      name: "pattern",
      type: "text",
      placeholder: "Pattern",
      label: "Pattern",
    },
    {
      id: 4,
      name: "bundle_ID",
      type: "text",
      placeholder: "Bundle ID",
      label: "Bundle ID",
    },
    {
      id: 5,
      name: "bundle_number",
      type: "text",
      placeholder: "Bundle Number",
      label: "Bundle Number",
    },
    {
      id: 6,
      name: "number_of_bundles_for_this_subject",
      type: "text",
      placeholder: "number of bundles for this subject",
      label: "number of bundles for this subject",
    },
    {
      id: 6,
      name: "number_of_papers_in_bundle",
      type: "text",
      placeholder: "number of papers in bundle",
      label: "number of papers in bundle",
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedValues = { ...values, assigned_to: selectedExaminer }; // Update assigned_to field
      const response = await axios.post("http://localhost:5000/collegePortal/addBundle", updatedValues);
      console.log(response.data);
      setMessage('Bundle Added!'); // Set the success message
      setIsSuccess(true); // Set isSuccess to true
      setOpenModel(true); // Open the modal upon successful college addition
      // Delay form reset until after state updates
      setTimeout(() => {
        formRef.current.reset();
      }, 0);
    } catch (error) {
      console.error('Error adding Bundle:', error);
      setMessage('Failed to Add Bundle. Please try again.'); // Set the error message
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
        <span className={`font-inter font-semibold text-4xl mr-96`}>ADD NEW BUNDLE</span>
        <NavLink to="../bundles">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <ArrowBackIosIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Back</span>
          </button>
        </NavLink>
      </div>

      <div className="body profile-settings-form flex flex-col">
        <div className="profile-settings-card card font-inter m-2 p-5
         bg-white drop-shadow-2xl w-full mt-14 ">
          <div className="heading font-inter text-xl font-normal mt-3 ml-2 mb-4">Fill to add new BUNDLE</div>

          <form ref={formRef} onSubmit={handleSubmit}>

            <FormInputs
              id={15}
              label="College Code"
              name="collegeCode"
              type="text"
              placeholder="College Code"
              value={values.collegeCode}
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

            <div className="form-group">
              <label htmlFor="examiner">Select Examiner:</label>
              <select className="custom-dropdown"
                id="assigned_to"
                name="assigned_to"
                value={selectedExaminer}
                onChange={(e) => setSelectedExaminer(e.target.value)}
              >
                <option value="" disabled>Select an Examiner</option>
                {examiners.map((examiner) => (
                  <option key={examiner.userID} value={examiner.userID}>
                    {`${examiner.name} - ${examiner.email}`}
                  </option>
                ))}
              </select>
            </div>

            <button className='mt-12 font-inter font-semibold text-md rounded-lg px-4 py-2 text-white 
               bg-button-blue hover:bg-button-blue-hover w-full'>SAVE</button>


          </form>

        </div>
      </div>

      <PopUpModal open={openModel} onClose={handleModalClose} isSuccess={isSuccess} message={message} />

    </div>
  )
}

export default AddSubjectPage