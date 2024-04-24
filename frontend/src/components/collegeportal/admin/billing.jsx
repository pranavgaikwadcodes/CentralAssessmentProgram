import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
import Table from '../../table/table'; 
import axios from 'axios';


const BillingPage = () => { 

  
  return (
    <div className='m-10 mr-20 content flex flex-col'>
      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>Billing Dashboard</span>
        
      </div>
      <div className="body">
        <div className="departments-table mt-20">
          <h2 className="text-2xl font-semibold mb-4">Payout Requests</h2> 
          {/* <Table columns={columns} data={rowData} /> */}

          <h2 className="text-2xl font-semibold mb-4">Transactions</h2> 
          {/* <Table columns={columns} data={rowData} /> */}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
