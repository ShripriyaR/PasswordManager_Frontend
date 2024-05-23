import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return isAuthenticated ? element : <Navigate to="/Home" />;
};

export default ProtectedRoute;
