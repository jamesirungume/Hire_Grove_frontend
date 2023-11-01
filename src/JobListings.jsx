import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListings = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        // Add any other necessary headers here
      };

      axios.get('https://your-api-endpoint.com/your-endpoint', {
        headers: headers
      })
      .then(response => {
        console.log('Response:', response.data);
        setJobListings(response.data); // Assuming the response contains job listings
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
        setLoading(false);
      });
    } else {
      console.log('Token not found in local storage');
      setLoading(false);
      // Handle if token is not available
    }
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading job listings...</p>
      ) : error ? (
        <p>Error fetching job listings. Please try again.</p>
      ) : (
        <div>
          <h1>Job Listings</h1>
          <ul>
            {jobListings.map((job, index) => (
              <li key={index}>
                {/* Display job details as needed */}
                <div>
                  <strong>{job.title}</strong>
                  <p>{job.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default JobListings;
