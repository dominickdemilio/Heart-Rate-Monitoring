import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Creates the authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State to track login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    // Handles user login
    const login = () => {
        setIsLoggedIn(true);
    };
    // Handles user logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login');
    };
    
    // Provides authentication-related data and methods
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
