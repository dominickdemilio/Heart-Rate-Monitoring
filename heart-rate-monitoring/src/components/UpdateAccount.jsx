import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateAccount() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return strongPasswordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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

        // API call to update account information

        navigate('/dashboard');
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
                <button type="submit" className="btn btn-primary">
                    Update Account
                </button>
            </form>
        </div>
    );
}

export default UpdateAccount;
