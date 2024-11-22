import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
import Table from '../../table/table'; // Import the Table component
import { BASE_URL } from '../../../helper/helper';

const DashboardPage = () => {
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const collegeCode = localStorage.getItem('collegeCODE');

      // Fetch departments using the college code
      const response = await fetch(`${BASE_URL}/collegePortal/departments/${collegeCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setDepartments(data);
      setTotalDepartments(data.length);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Define columns for the table
  const columns = ['Department Name', 'Department branches', 'Head of Department', 'HOD Contact', 'Department Username'];

  // Extract data from the departments array and create an array of row objects
  const rowData = departments.map(department => ({
    'Department Name': department.name,
    'Department branches': department.branches,
    'Head of Department': department.hod,
    'HOD Contact': (
      <>
        Phone: {department.hod_contact}
        <br />
        Email: {department.hod_email}
      </>
    ),
    'Department Username': department.department_username,
  }));
  

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>Department Dashboard</span>
        <NavLink to="../addDepartment">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <AddIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Add Department</span>
          </button>
        </NavLink>
      </div>
      <div className="body">
        <div className="total-college-registered-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-44 mt-32 cursor-pointer">
          <div className="heading text-xl font-normal">Total Departments</div>
          <div className="value font-semibold text-4xl text-text-blue pt-1.5">{totalDepartments}</div>
        </div>

        <div className="departments-table mt-20">
          <h2 className="text-2xl font-semibold mb-4">Departments List</h2>
          {/* Pass columns and rowData to the Table component */}
          <Table columns={columns} data={rowData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
