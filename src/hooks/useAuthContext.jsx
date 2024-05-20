import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRequired = ({ children }) => {
  const location = useLocation();
  const userData = useSelector((state) => state.authenticationReducer.userData);

  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthRequired;
