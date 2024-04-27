import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, Outlet } from 'react-router-dom';
import Table from '../table/table'; // Import the Table component

const DashboardPage = () => {
  const [colleges, setColleges] = useState([]);
  const [totalColleges, setTotalColleges] = useState(0);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/colleges/');
      if (!response.ok) {
        throw new Error('Failed to fetch colleges');
      }
      const data = await response.json();
      setColleges(data);
      setTotalColleges(data.length);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  // Define columns for the table
  const columns = ['Name', 'Address', 'Center Code', 'Contact', 'Email'];

  // Extract data from the colleges array and create an array of row objects
  const rowData = colleges.map(college => ({
    Name: college.name,
    Address: college.address,
    'Center Code': college.center_code,
    Contact: college.contact,
    Email: college.email
  })).reverse();

  return (
    <>
      <div className='m-10 mr-20 content flex flex-col'>
        <div className="header flex justify-between items-center">
          <span className={`font-inter font-semibold text-4xl mr-96`}>CAP Admin Dashboard</span>
          <NavLink to="/CAPADMIN/addCollege">
            <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
              <AddIcon sx={{ fontSize: 18 }} />
              <span className="ml-2">Add College</span>
            </button>
          </NavLink>
        </div>
        
        <div className="body">
          <div className="total-college-registered-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-44 mt-32 cursor-pointer">
            <div className="heading text-xl font-normal">Total Colleges Registered</div>
            <div className="value font-semibold text-4xl text-text-blue pt-1.5">{totalColleges}</div>
          </div>

          <div className="colleges-table mt-20">
            <h2 className="text-2xl font-semibold mb-4">Colleges List</h2>
            {/* Pass columns and rowData to the Table component */}
            <Table columns={columns} data={rowData} />
          </div>
        </div>
      </div>
      <Outlet/>
    </>
  );
};

export default DashboardPage;
