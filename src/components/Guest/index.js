import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';

function Guest({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

Guest.propTypes = {
  children: PropTypes.node,
};

export default Guest;
