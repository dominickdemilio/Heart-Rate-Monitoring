import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    if (!isLoggedIn || !token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
