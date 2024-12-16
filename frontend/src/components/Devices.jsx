import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Devices() {
    const [devices, setDevices] = useState([]);
    const [newDevice, setNewDevice] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Default values
    const defaultTimeRange = { start: '06:00', end: '22:00' };
    const defaultFrequency = 30;

    const fetchDevices = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/devices', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setDevices(data.devices);
            } else {
                setError('Failed to fetch devices.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddDevice = async () => {
        if (!newDevice.trim()) {
            setError('Device name cannot be empty');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                'http://localhost:8000/api/devices/add',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: newDevice.trim(),
                        timeRange: { ...defaultTimeRange },
                        frequency: defaultFrequency,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setDevices((prevDevices) => [...prevDevices, data.device]);
                setNewDevice('');
                setError(null);
                setSuccess('Device added successfully');
            } else {
                setError('Failed to add device');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRemoveDevice = async (deviceId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:8000/api/devices/remove/${deviceId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setDevices((prevDevices) =>
                    prevDevices.filter((device) => device._id !== deviceId)
                );
                setSuccess('Device removed successfully');
            } else {
                setError('Failed to remove device');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateDevice = async (deviceId, updatedFields) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:8000/api/devices/update/${deviceId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedFields),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setDevices((prevDevices) =>
                    prevDevices.map((device) =>
                        device._id === deviceId ? data.device : device
                    )
                );
                setSuccess('Device updated successfully');
            } else {
                setError('Failed to update device');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Manage Devices</h1>
            <div className="mb-3">
                <label htmlFor="newDevice" className="form-label">
                    Add New Device
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="newDevice"
                    value={newDevice}
                    onChange={(e) => setNewDevice(e.target.value)}
                />
                {error && (
                    <div className="alert alert-danger mt-2">{error}</div>
                )}
                {success && (
                    <div className="alert alert-success mt-2">{success}</div>
                )}
                <button
                    className="btn btn-primary mt-3"
                    onClick={handleAddDevice}
                >
                    Add Device
                </button>
            </div>
            <h2>Your Devices</h2>
            {devices.length === 0 ? (
                <p>No devices registered yet.</p>
            ) : (
                <ul className="list-group">
                    {devices.map((device) => (
                        <li key={device._id} className="list-group-item">
                            <div>
                                <h5>{device.name}</h5>
                                <div className="mb-2">
                                    <label className="form-label">
                                        Measurement Time Range:
                                    </label>
                                    <div className="d-flex">
                                        <input
                                            type="time"
                                            className="form-control me-2"
                                            value={device.timeRange.start}
                                            onChange={(e) =>
                                                handleUpdateDevice(device._id, {
                                                    timeRange: {
                                                        ...device.timeRange,
                                                        start: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                        <input
                                            type="time"
                                            className="form-control"
                                            value={device.timeRange.end}
                                            onChange={(e) =>
                                                handleUpdateDevice(device._id, {
                                                    timeRange: {
                                                        ...device.timeRange,
                                                        end: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">
                                        Measurement Frequency (minutes):
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        value={device.frequency}
                                        onChange={(e) =>
                                            handleUpdateDevice(device._id, {
                                                frequency:
                                                    parseInt(e.target.value) ||
                                                    1,
                                            })
                                        }
                                    />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleRemoveDevice(device._id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Devices;
