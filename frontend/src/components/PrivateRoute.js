// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
