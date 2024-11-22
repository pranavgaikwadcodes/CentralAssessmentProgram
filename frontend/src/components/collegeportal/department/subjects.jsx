import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Table from '../../table/table'; // Import the Table component
import { BASE_URL } from '../../../helper/helper';

const SubjectsPage = () => {
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const collegeCode = localStorage.getItem('college_code');
      const departmentName = localStorage.getItem('departmentName');

      // Fetch subjects using the college code and department
      const response = await fetch(`${BASE_URL}/collegePortal/subjects/${departmentName}?college_code=${collegeCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }
      const data = await response.json();
      setSubjects(data.subjects);
      setTotalSubjects(data.subjects.length);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // Define columns for the table
  const columns = ['Subject Name', 'Subject Type', 'Subject Code', 'Patern'];

  // Extract data from the subjects array and create an array of row objects
  const rowData = subjects.map(subject => ({
    'Subject Name': subject.subject_name,
    'Subject Type': subject.subject_type,
    'Subject Code': subject.subject_code,
    'Patern': subject.pattern,
  }));

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>SUBJECT MANAGEMENT</span>
        <NavLink to="../addSubject">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <AddIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Add Subject</span>
          </button>
        </NavLink>
      </div>
      <div className="body">
        <div className="total-college-registered-card card font-inter m-2 p-5 bg-white drop-shadow-2xl w-44 mt-32 cursor-pointer">
          <div className="heading text-xl font-normal">Total Subjects</div>
          <div className="value font-semibold text-4xl text-text-blue pt-1.5">{totalSubjects}</div>
        </div>

        <div className="subjects-table mt-20">
          <h2 className="text-2xl font-semibold mb-4">Subjects List</h2>
          {/* Pass columns and rowData to the Table component */}
          <Table columns={columns} data={rowData} />
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
