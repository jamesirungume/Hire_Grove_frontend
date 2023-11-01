import React, { useEffect, useState } from 'react';

function TokenRefresher() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Function to refresh the access token
    const refreshAccessToken = async (oldToken) => {
      try {
        // Perform the refresh token request to get a new access token
        const response = await fetch('https://hire-backend.onrender.com/Availablejobs', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${oldToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.newAccessToken;

          // Update the access token in the state and local storage
          setAccessToken(newAccessToken);
          localStorage.setItem('accessToken', newAccessToken);
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        // Handle error, e.g., redirect to login page, etc.
      }
    };

    // Function to check token expiration and refresh if needed
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem('accessToken');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      if (storedToken && tokenExpiration) {
        const currentTime = new Date().getTime();
        const expiresIn = tokenExpiration - currentTime;
        const refreshThreshold = 5 * 60 * 1000; // 5 minutes before expiry

        if (expiresIn < refreshThreshold) {
          refreshAccessToken(storedToken);
        }
      }
    };

    // Initial token check and setting interval for periodic checks
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything visible
}

export default TokenRefresher;
