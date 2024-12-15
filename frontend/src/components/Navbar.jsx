import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navbar = () => {
    const context = useContext(AuthContext);

    if (!context) {
        console.error('AuthContext is undefined.');
        return null;
    }

    const { isLoggedIn, logout } = context;

    return (
        isLoggedIn && (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Heart Track
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/devices">
                                    Devices
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reference">
                                    References
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/weekly-view">
                                    Weekly Summary
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/daily-view">
                                    Daily Detail
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/update-account">
                                    Edit Account
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/team-info">
                                    Team Info
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    );
};

export default Navbar;
