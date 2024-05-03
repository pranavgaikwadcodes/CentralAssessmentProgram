import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Table from '../../table/table';
import axios from 'axios';
import PopUpWithInput from '../../popUp/confirmationModalWithInput';

const BillingPage = () => {
  const [requestedPayments, setRequestedPayments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    fetchRequestedPayments();
    fetchTransactions();
  }, []);

  const fetchRequestedPayments = () => {
    axios.get('http://localhost:5000/examinerPortal/examinerRequestedPaymentDetail')
      .then(response => {
        setRequestedPayments(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching requested payments:', error);
      });
  };

  const fetchTransactions = () => {
    axios.get('http://localhost:5000/collegePortal/billing')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };

  const handlePayment = (userId, method) => {
    setSelectedUserId(userId);
    setPaymentMethod(method);
  };

  const handleConfirmPayment = async (amount) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const requestData = {
        userID: selectedUserId,
        payment_status: 'paid',
        payment_method: paymentMethod,
        transaction_id: null, // Assuming transaction ID is not provided here
        transaction_day_date: currentDate,
        amount: amount
      };
  
      const response = await axios.post('http://localhost:5000/collegePortal/addBillingData', requestData);
      const response2 = await axios.patch(
        `http://localhost:5000/examinerPortal/updatePaymentRequest/${requestData.userID}`,
        [{ propName: 'payment_status', value: 'paid' }]
      );
      
      console.log(response.data.message); // Log the response message or handle it accordingly
      console.log(response2.data.message); // Log the response message or handle it accordingly
  
      // Reset selectedUserId and paymentMethod after making the request
      setSelectedUserId('');
      setPaymentMethod('');
    } catch (error) {
      console.error('Error confirming payment:', error);
      // Handle error if needed
    }
  };
  

  // Define columns for the table
  const columns = ['User ID', 'Name', 'Email', 'UPI ID', 'Action'];
 
  // Extract data from the payments array and create an array of row objects
  const rowData = requestedPayments
  .filter(user => user.payment_status === 'requested')
  .map(user => ({
    'User ID': user.userID,
    'Name': user.name,
    'Email': user.email,
    'UPI ID': user.reciever_upiID,
    'Action': (
      <div>
        <button onClick={() => handlePayment(user.userID, 'cash')} className='bg-green-400 p-2 rounded-lg'>Pay Cash</button>
        <button onClick={() => handlePayment(user.userID, 'upi')} className='p-2 rounded-lg bg-blue-300 ml-2'>Pay UPI</button>
      </div>
    )
  }));

  // Define columns for the table
  const columns2 = ['User ID', 'Payment Status', 'Payment Method', 'Date' ];
 
  // Extract data from the payments array and create an array of row objects
  const rowData2 = transactions.map(user => ({
    'User ID': user.userID,
    'Payment Status': user.payment_status,
    'Payment Method': user.payment_method,
    'Date': user.transaction_day_date, 
  }));

  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>Billing Dashboard</span>
      </div>
      <div className="body">
        <div className="departments-table mt-20">
          <h2 className="text-2xl font-semibold mb-4">Payout Requests</h2>
          <Table columns={columns} data={rowData} />
        </div>

        <div className="departments-table mt-28 bg-green-100 p-4">
          <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
          <Table columns={columns2} data={rowData2} />
        </div>
      </div>
      {selectedUserId && paymentMethod && (
        <PopUpWithInput
          open={true} // or manage its state
          onClose={() => { setSelectedUserId(''); setPaymentMethod(''); }}
          onConfirm={handleConfirmPayment}
          title="Enter Amount"
          content="Please enter the payment amount:"
        />
      )}
    </div>
  );
};

export default BillingPage;
