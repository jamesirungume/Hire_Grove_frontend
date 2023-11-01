import React, { useState, useEffect } from 'react';
import JobListing from './JobListing';
import { Link } from 'react-router-dom';

function JobListings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch("https://hire-backend.onrender.com/Availablejobs", {
          headers: {
            Authorization: `Bearer ${accessToken}` // Set the access token in the Authorization header
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jobListingsData = await response.json();
        setJobListings(jobListingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job listings:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchJobListings();
  }, []);

  useEffect(() => {
    // Filter job listings based on the search term
    const filteredResults = jobListings.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredJobs(filteredResults);
  }, [searchTerm, jobListings]);

  return (
    <>
      <div className="jobsearch-nav-container">
        <form action="" className="jobsearch-form">
          <input
            placeholder="Search job title"
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
        {loading ? (
          <p>Loading job listings...</p>
        ) : filteredJobs.length > 0 ? (
          <ul>
            {filteredJobs.map((job, index) => (
              <JobListing key={index} job={job} />
            ))}
          </ul>
        ) : (
          <p>No jobs found matching the search term.</p>
        )}
      </div>
    </>
  );
}

export default JobListings;
