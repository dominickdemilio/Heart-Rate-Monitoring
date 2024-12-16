import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UpdateAccount from './components/UpdateAccount';
import Devices from './components/Devices';
import WeeklySummary from './components/WeeklySummary';
import DetailedDailyView from './components/DetailedDailyView';
import TeamInfo from './components/TeamInfo';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
    <Router>
        <AuthProvider>
            <Navbar />
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/team-info" element={<TeamInfo />} />

                {/* PROTECTED ROUTES */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/devices"
                    element={
                        <ProtectedRoute>
                            <Devices />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/weekly-view"
                    element={
                        <ProtectedRoute>
                            <WeeklySummary />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/daily-view"
                    element={
                        <ProtectedRoute>
                            <DetailedDailyView />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/update-account"
                    element={
                        <ProtectedRoute>
                            <UpdateAccount />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    </Router>
);

export default App;
