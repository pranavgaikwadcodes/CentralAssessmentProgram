import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardPage = () => {
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userID = localStorage.getItem('userID'); // Assuming you store the userID in localStorage
    if (userID) {
      axios.get(`http://localhost:5000/examinerPortal/card/${userID}`)
        .then(response => {
          setCardDetails(response.data.Card_Details);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching card details:', error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="m-10 mr-20 content flex flex-col w-96">
      
      <div className="body flex flex-col mt-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : cardDetails ? (
          <div className="card font-inter m-2 p-5 bg-green-100 drop-shadow-2xl">
            <div className="heading text-xl font-extrabold mb-4">Card Details</div>
            <div className="details">
              {Object.entries(cardDetails).map(([key, value]) => (
                <p key={key} className="text-lg font-medium">{key}: {value}</p>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">Card not found</div>
        )}
      </div>

    </div>
  );
};

export default CardPage;
