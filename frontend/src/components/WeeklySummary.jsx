import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * WeeklySummary Component
 *
 * This component fetches and displays a weekly summary of heart rate data
 * for a selected device. Users can select a device from a dropdown list.
 */
function WeeklySummary() {
    // State variables for managing devices, summary data, and selected device ID
    const [summaryData, setSummaryData] = useState(null); // Weekly summary data
    const [devices, setDevices] = useState([]); // List of user's devices
    const [selectedDeviceId, setSelectedDeviceId] = useState(''); // Currently selected device ID

    /**
     * useEffect hook to fetch devices when the component mounts.
     * Retrieves the user's devices from the backend and selects the first device by default.
     */
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(
                    'http://localhost:8000/api/devices/',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const { devices } = await response.json();
                setDevices(devices);
                if (devices.length > 0) {
                    setSelectedDeviceId(devices[0].particle_id); // Default to the first device
                }
            } catch (error) {
                console.error('Failed to fetch devices:', error.message);
            }
        };
        fetchDevices();
    }, []);

    /**
     * useEffect hook to fetch weekly summary data when the selected device changes.
     * Retrieves heart rate summary data for the currently selected device.
     */
    useEffect(() => {
        if (selectedDeviceId) {
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem('token');

                    const response = await fetch(
                        `http://localhost:8000/api/devices/summary/${selectedDeviceId}/weekly`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }

                    const data = await response.json();
                    setSummaryData(data);
                } catch (error) {
                    console.error(
                        'Failed to fetch weekly summary:',
                        error.message
                    );
                }
            };
            fetchData();
        }
    }, [selectedDeviceId]);

    // Display loading messages while devices or summary data are being fetched
    if (!devices.length) {
        return <div className="container mt-5">Loading Devices...</div>;
    }

    if (!summaryData) {
        return <div className="container mt-5">Loading Weekly Summary...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Weekly Summary</h1>
            {/* Dropdown menu for selecting a device */}
            <div className="mb-3">
                <label htmlFor="deviceSelect" className="form-label">
                    Select a device to pull data from:
                </label>
                <select
                    id="deviceSelect"
                    className="form-select"
                    value={selectedDeviceId}
                    onChange={(e) => setSelectedDeviceId(e.target.value)}
                >
                    {devices.map((device) => (
                        <option
                            key={device.particle_id}
                            value={device.particle_id}
                        >
                            {device.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Display weekly summary data in a card */}
            <div className="card mt-3">
                <div className="card-body">
                    <p>
                        <strong>Average Heart Rate:</strong>{' '}
                        {summaryData.average.toFixed(2)} bpm
                    </p>
                    <p>
                        <strong>Minimum Heart Rate:</strong> {summaryData.min}{' '}
                        bpm
                    </p>
                    <p>
                        <strong>Maximum Heart Rate:</strong> {summaryData.max}{' '}
                        bpm
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WeeklySummary;
