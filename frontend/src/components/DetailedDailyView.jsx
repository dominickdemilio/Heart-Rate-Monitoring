import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chart.js/auto';

function DetailedDailyView() {
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const [dayData, setDayData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split('T')[0]
    );

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
            // Fetch detailed daily data for the selected device and date
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem('token');

                    const response = await fetch(
                        `http://localhost:8000/api/devices/details/${selectedDeviceId}/daily?date=${selectedDate}`,
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

                    const { dailyData } = await response.json();

                    const formattedData = {
                        time: dailyData.map((data) =>
                            new Date(data.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                        ),
                        heartRate: dailyData.map((data) => data.heartRate),
                        oxygenSaturation: dailyData.map(
                            (data) => data.oxygenSaturation
                        ),
                    };

                    setDayData(formattedData);
                } catch (error) {
                    console.error('Failed to fetch daily data:', error.message);
                }
            };

            fetchData();
        }
    }, [selectedDeviceId, selectedDate]);

    if (!devices.length) {
        return <div className="container mt-5">Loading Devices...</div>;
    }

    if (!dayData) {
        return (
            <div className="container mt-5">Loading Detailed Daily View...</div>
        );
    }

    const heartRateData = {
        labels: dayData.time,
        datasets: [
            {
                label: 'Heart Rate (bpm)',
                data: dayData.heartRate,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const oxygenData = {
        labels: dayData.time,
        datasets: [
            {
                label: 'Blood Oxygen Saturation (%)',
                data: dayData.oxygenSaturation,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    return (
        <div className="container mt-5">
            <h1>Detailed Daily View</h1>
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
            <div className="mb-3">
                <label htmlFor="datePicker" className="form-label">
                    Select Date:
                </label>
                <input
                    type="date"
                    id="datePicker"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <h5>Heart Rate</h5>
                    <Line data={heartRateData} />
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <h5>Blood Oxygen Saturation</h5>
                    <Line data={oxygenData} />
                </div>
            </div>
        </div>
    );
}

export default DetailedDailyView;
