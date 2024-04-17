import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignedBundles = ({ cardNumber }) => {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignedBundles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/examinerPortal/assigned/${cardNumber}`);
        setBundles(response.data.bundles);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch assigned bundles');
        setLoading(false);
      }
    };

    fetchAssignedBundles();
  }, [cardNumber]);

  const handleStatusChange = async (bundleId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5000/collegePortal/updateBundle/${bundleId}`, [
        { propName: 'bundle_status', value: newStatus }
      ]);
      console.log(response.data.message);
      // Update the bundle status in the state
      setBundles(prevBundles => {
        return prevBundles.map(bundle => {
          if (bundle._id === bundleId) {
            return { ...bundle, bundle_status: newStatus };
          }
          return bundle;
        });
      });
    } catch (error) {
      console.error('Error updating bundle status:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (bundles.length === 0) {
    return <p>No bundles assigned to this card number</p>;
  }

  return (
    <div className="card bg-skyblue p-10 rounded-lg shadow-md bg-blue-100">
      <h2 className="text-xl font-semibold mb-11">Bundles Assigned to this Card Number</h2>
      <ul>
        {bundles.map(bundle => (
          <li key={bundle._id} className="mb-4">
            <p className='font-bold'>Bundle Number: {bundle.bundle_number}</p>
            <p>Subject: {bundle.subject}</p>
            <p>Subject Code: {bundle.subjectCode}</p>
            <p>Subject pattern: {bundle.pattern}</p>
            <p>Number of Papers: {bundle.number_of_papers_in_bundle}</p>
            <p>Bundle status: {bundle.bundle_status}</p>
            <select value={bundle.bundle_status} onChange={(e) => handleStatusChange(bundle._id, e.target.value)}>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignedBundles;
