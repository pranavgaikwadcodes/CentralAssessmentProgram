import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Table from '../../table/table'; // Import the Table component
import { BASE_URL } from '../../../helper/helper';

const TeachersPage = () => {
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const collegeCode = localStorage.getItem('college_code');
      const department = localStorage.getItem('departmentName');

      // Fetch teachers using the college code and department
      const response = await fetch(`${BASE_URL}/collegePortal/teachers?college_code=${collegeCode}&department=${department}`);
      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }
      const data = await response.json();
      setTeachers(data.teachers);
      setTotalTeachers(data.count);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  // Define columns for the table
  const columns = ['Name', 'Designation', 'Email', 'Contact'];

  // Extract data from the teachers array and create an array of row objects
  const rowData = teachers.map(teacher => ({
    'Name': teacher.name,
    'Designation': teacher.designation,
    'Email': teacher.college_email,
    'Contact': teacher.contact,
  }));

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>TEACHER MANAGEMENT</span>
        <NavLink to="../addTeacher">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <AddIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Add Teacher</span>
          </button>
        </NavLink>
      </div>
      <div className="body">
        <div className="total-college-registered-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-44 mt-32 cursor-pointer">
          <div className="heading text-xl font-normal">Total Teachers</div>
          <div className="value font-semibold text-4xl text-text-blue pt-1.5">{totalTeachers}</div>
        </div>

        <div className="teachers-table mt-20">
          <h2 className="text-2xl font-semibold mb-4">Teachers List</h2>
          {/* Pass columns and rowData to the Table component */}
          <Table columns={columns} data={rowData} />
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;
