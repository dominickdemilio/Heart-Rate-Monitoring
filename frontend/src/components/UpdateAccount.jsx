import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateAccount() {
    const navigate = useNavigate();

    // Retrieve user info from localStorage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const validatePassword = (password) => {
        const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return strongPasswordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password && !validatePassword(password)) {
            setError(
                'Password must be at least 8 characters long, include at least one number, and one special character'
            );
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(
                'http://localhost:8000/api/auth/update',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        password: password || undefined, // Only update password if user changed it
                    }),
                }
            );

            if (response.ok) {
                const updatedData = await response.json();
                localStorage.setItem('user', JSON.stringify(updatedData.user));
                setSuccess('Account updated successfully!');
            } else {
                // Handle bad response from the server
                const errorData = await response.json();
                setError(
                    errorData.message ||
                        'Failed to update account (server error)'
                );
            }
        } catch (err) {
            setError('Unexpected error occurred.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Update Account</h1>
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
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        New Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}
                <button type="submit" className="btn btn-primary">
                    Update Account
                </button>
            </form>
        </div>
    );
}

export default UpdateAccount;
