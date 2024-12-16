import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function WeeklySummary() {
    const [summaryData, setSummaryData] = useState(null);
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');

    useEffect(() => {
        // Fetch user's devices
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
                    setSelectedDeviceId(devices[0]._id); // Default to the first device
                }
            } catch (error) {
                console.error('Failed to fetch devices:', error.message);
            }
        };
        fetchDevices();
    }, []);

    useEffect(() => {
        if (selectedDeviceId) {
            // Fetch weekly summary for selected device
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

    if (!devices.length) {
        return <div className="container mt-5">Loading Devices...</div>;
    }

    if (!summaryData) {
        return <div className="container mt-5">Loading Weekly Summary...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Weekly Summary</h1>
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
                        <option key={device._id} value={device._id}>
                            {device.name}
                        </option>
                    ))}
                </select>
            </div>
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
