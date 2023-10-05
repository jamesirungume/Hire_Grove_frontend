import React, { useState, useEffect } from 'react';
import JobListing from './JobListing';
import { Link } from 'react-router-dom';

function JobListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('loginToken'); // Change 'access_token' to 'loginToken' if that's what you're using in local storage

    // Fetch the job listings from the backend API with authentication
    fetch("https://hire-backend.onrender.com/Availablejobs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Add this line to specify JSON content type
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jobListings) => {
        console.log("Fetched job listings:", jobListings);
        setJobListings(jobListings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job listings:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="jobsearch-nav-container">
        <form action="" className="jobsearch-form">
          <input
            placeholder="job title"
            className="search-jobs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="job-nav-links">
          <Link to="/jobs/appliedjobs">Applied Jobs</Link>
          <Link to="/addjob" className="create-job-alert">
            Create Job Alert
          </Link>
        </div>
      </div>

      <div className="job-listings">
        {/* Conditional rendering to display the jobs */}
        {jobListings !== '' && jobListings.length > 0 ? (
          searchTerm !== ''
            ? filteredJobs.map((job, index) => (
                <JobListing key={index} job={job} />
              ))
            : (
              <ul>
                {jobListings.map((job, index) => (
                  <JobListing key={index} job={job} />
                ))}
              </ul>
            )
        ) : (
          <p>Loading job listings...</p>
        )}
      </div>
    </>
  );
}

export default JobListings;
