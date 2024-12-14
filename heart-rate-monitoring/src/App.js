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

const App = () => (
    <Router>
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />

                {/* WILL BE PROTECTED (need token-based authentication) */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/update-account" element={<UpdateAccount />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="/weekly-view" element={<WeeklySummary />} />
                <Route path="/daily-view" element={<DetailedDailyView />} />

                {/* PROTECTED ROUTES */}
                {/* <Route
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
                    path="/weekly-summary"
                    element={
                        <ProtectedRoute>
                            <WeeklySummary />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/daily-detail"
                    element={
                        <ProtectedRoute>
                            <DetailedDailyView />
                        </ProtectedRoute>
                    }
                /> */}
            </Routes>
        </AuthProvider>
    </Router>
);

export default App;
