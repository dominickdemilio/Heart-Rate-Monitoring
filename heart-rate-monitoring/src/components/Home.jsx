import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className="container mt-5 text-center">
            <h1>Welcome to Heart Track</h1>
            <p>
                Heart Track is a low-cost IoT-enabled web application that helps
                you monitor your heart rate and blood oxygen saturation level.
                Set up your device, track your stats, and stay on top of your
                health effortlessly.
            </p>
            <p>Created by Dom, Collin, and Reece.</p>
            {!isLoggedIn && (
                <div className="mt-4">
                    <Link to="/login" className="btn btn-primary me-2">
                        Login
                    </Link>
                    <Link to="/create-account" className="btn btn-primary me-2">
                        Create Account
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
