// CreateAccount.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// State variables for form inputs and error handling
function CreateAccount() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Validates password strength
    const validatePassword = (password) => {
        const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return strongPasswordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!validatePassword(password)) {
            setError(
                'Password must be at least 8 characters long, include at least one number, and one special character'
            );
            return;
        }

        try {
            // API call to create account
            const response = await fetch(
                'http://localhost:8000/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        firstName,
                        lastName,
                    }),
                }
            );

            if (response.ok) {
                // Account successfully created, navigate to login page
                navigate('/login');
            } else {
                // Handle errors returned from the server
                const errorData = await response.json();
                setError(
                    errorData.error || 'Failed to create account (from server)'
                );
            }
        } catch (err) {
            // Handle network or other unexpected errors
            setError('An unexpected error occurred. Please try again later.');
        }

        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">
                    Create Account
                </button>
            </form>
            <div className="mt-3">
                <p>
                    <Link to="/">Back to Home</Link>
                </p>
            </div>
        </div>
    );
}

export default CreateAccount;
