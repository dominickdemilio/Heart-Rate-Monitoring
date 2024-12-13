import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Reference from './pages/Reference';
// import WeeklySummary from './pages/WeeklySummary';
// import DailyDetail from './pages/DailyDetail';

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/reference" element={<Reference />} />
            <Route path="/weekly-summary" element={<WeeklySummary />} />
            <Route path="/daily-detail" element={<DailyDetail />} /> */}
        </Routes>
    </Router>
);

export default App;
