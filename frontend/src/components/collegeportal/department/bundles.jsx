import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Table from '../../table/table'; // Import the Table component
import axios from 'axios';
import ConfirmationModal from '../../popUp/confirmationModal'; 

const BundlesPage = () => {
  const [bundles, setBundles] = useState([]); // State to hold bundles data
  const [totalBundles, setTotalBundles] = useState(0); // State to hold total number of bundles
  const [examiners, setExaminers] = useState([]); // State to hold examiners data
  const [selectedExaminer, setSelectedExaminer] = useState({}); // State to hold selected examiner for each bundle
  const [selectedBundle, setSelectedBundle] = useState(null); // State to hold the selected bundle for confirmation
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State to manage confirmation modal open/close

  useEffect(() => {
    fetchBundles(); // Fetch bundles data when component mounts
    fetchExaminers(); // Fetch examiners data when component mounts
  }, []);

  // Function to fetch bundles data by college code and department
  const fetchBundles = async () => {
    try {
      const collegeCode = localStorage.getItem('college_code'); // Get college code from local storage
      const department = localStorage.getItem('departmentName'); // Get department name from local storage
      const response = await axios.get(`http://localhost:5000/collegePortal/bundles?college_code=${collegeCode}&department=${department}`);
      setBundles(response.data.bundles); // Set bundles data
      setTotalBundles(response.data.bundles.length); // Set total number of bundles
      // Initialize selected examiner for each bundle
      const selectedExaminerData = {};
      response.data.bundles.forEach(bundle => {
        if (bundle.assigned_to) {
          selectedExaminerData[bundle._id] = bundle.assigned_to;
        }
      });
      setSelectedExaminer(selectedExaminerData);
    } catch (error) {
      console.error('Error fetching bundles:', error);
    }
  };

  // Function to fetch examiners data
  const fetchExaminers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/collegePortal/examiners/examiner');
      setExaminers(response.data.examiners); // Set examiners data
    } catch (error) {
      console.error('Error fetching examiners:', error);
    }
  };

  // Function to handle examiner selection for each bundle
  const handleExaminerSelection = (bundleId, examinerId) => {
    setSelectedExaminer({ ...selectedExaminer, [bundleId]: examinerId }); // Update selected examiner for the bundle
    setSelectedBundle(bundleId); // Set the selected bundle
    setConfirmationOpen(true); // Open the confirmation modal
  };

  // Function to handle confirmation modal close
  const handleCloseConfirmationModal = () => {
    setSelectedBundle(null); // Reset the selected bundle
    setConfirmationOpen(false); // Close the confirmation modal
  };

  // Function to handle confirmation of examiner change
  const handleConfirmation = async () => {
    try {
      // Update selected examiner for the bundle in the database
      await axios.patch(`http://localhost:5000/collegePortal/updateBundleToAssign/${selectedBundle}`, [{ assigned_to: selectedExaminer[selectedBundle] } ]);
      setConfirmationOpen(false); // Close the confirmation modal
    } catch (error) {
      console.error('Error updating bundle:', error);
    }
  };

  // Define columns for the table
  const columns = ['Bundle ID', 'Subject', 'Subject Code', 'Pattern', 'Bundle Number', 'Status', 'Assigned To'];

  // Extract data from the bundles array and create an array of row objects
  const rowData = bundles.map(bundle => ({
    'Bundle ID': bundle.bundle_ID,
    'Subject': bundle.subject,
    'Subject Code': bundle.subjectCode,
    'Pattern': bundle.pattern,
    'Bundle Number': bundle.bundle_number,
    'Status': bundle.bundle_status,
    'Assigned To': (
      <select
        value={selectedExaminer[bundle._id] || ''}
        onChange={(e) => handleExaminerSelection(bundle._id, e.target.value)}
      >
        <option value="">Select Examiner</option>
        {examiners.map(examiner => (
          <option key={examiner.userID} value={examiner.userID}>
            {`${examiner.name} - ${examiner.email}`}
          </option>
        ))}
      </select>
    )
  }));

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>BUNDLES MANAGEMENT</span>
        <NavLink to="../addBundle">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <AddIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Add Bundle</span>
          </button>
        </NavLink>
      </div>
      <div className="body">
        <div className="total-college-registered-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-44 mt-32 cursor-pointer">
          <div className="heading text-xl	font-normal	">Total Bundles</div>
          <div className="value font-semibold text-4xl text-text-blue pt-1.5">{totalBundles}</div>
        </div>
        <div className="bundles-table mt-8">
          <h2 className="text-2xl font-semibold mb-4">Bundles List</h2>
          {/* Pass columns and rowData to the Table component */}
          <Table columns={columns} data={rowData} />
        </div>
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmationOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmation}
        title="Confirm Examiner Change"
        content={`Are you sure you want to assign this examiner to the selected bundle?`}
      />
    </div>
  );
};

export default BundlesPage;
