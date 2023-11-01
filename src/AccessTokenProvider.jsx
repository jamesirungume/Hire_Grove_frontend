import React, { createContext, useState, useContext } from 'react';

// Create the context
const AccessTokenContext = createContext(null);

// Provider component
export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

// Custom hook to access the context value
export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error('useAccessToken must be used within an AccessTokenProvider');
  }
  return context;
};
