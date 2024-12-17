import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Devices() {
    // State variables to manage devices, form inputs, and feedback messages
    const [devices, setDevices] = useState([]); // List of devices
    const [deviceName, setDeviceName] = useState(''); // Input for new device name
    const [accessToken, setAccessToken] = useState(''); // Input for access token
    const [particleId, setParticleId] = useState(''); // Input for particle ID
    const [error, setError] = useState(null); // Error message state
    const [success, setSuccess] = useState(null); // Success message state

    // Default values for device settings
    const defaultTimeRange = { start: '06:00', end: '22:00' }; // Default measurement time range
    const defaultFrequency = 30; // Default measurement frequency (minutes)

    /**
     * Fetches the list of devices from the backend API.
     * Retrieves the token from local storage for authorization.
     * Updates the state with the retrieved devices or displays an error.
     */
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
                setTimeout(() => setError(null), 10000);
            }
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(null), 10000);
        }
    };

    /**
     * Handles adding a new device to the system.
     * Performs input validation for required fields before making the API call.
     * On success, updates the devices list and resets form fields.
     */
    const handleAddDevice = async () => {
        // Input validation for device fields
        if (!deviceName.trim()) {
            setError('Device name cannot be empty');
            setTimeout(() => setError(null), 10000);
            return;
        }
        if (!accessToken.trim()) {
            setError('Access token cannot be empty');
            setTimeout(() => setError(null), 10000);
            return;
        }
        if (!particleId.trim()) {
            setError('Particle ID cannot be empty');
            setTimeout(() => setError(null), 10000);
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
                        access_token: accessToken.trim(),
                        particle_id: particleId.trim(),
                        name: deviceName.trim(),
                        timeRange: { ...defaultTimeRange },
                        frequency: defaultFrequency,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setDevices((prevDevices) => [...prevDevices, data.device]);
                setDeviceName('');
                setAccessToken('');
                setParticleId('');
                setError(null);
                setSuccess('Device added successfully');
                setTimeout(() => setSuccess(null), 10000);
            } else {
                setError('Failed to add device');
                setTimeout(() => setError(null), 10000);
            }
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(null), 10000);
        }
    };

    /**
     * Handles removing a device by its ID.
     * Sends a DELETE request to the backend and updates the device list on success.
     * @param {string} deviceId - The ID of the device to remove.
     */
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
                setTimeout(() => setSuccess(null), 10000);
            } else {
                setError('Failed to remove device');
                setTimeout(() => setError(null), 10000);
            }
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(null), 10000);
        }
    };

    /**
     * Handles updating a device's details.
     * Sends a PUT request to update the device fields.
     * @param {string} deviceId - The ID of the device to update.
     * @param {object} updatedFields - The fields to update in the device.
     */
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
                setTimeout(() => setSuccess(null), 10000);
            } else {
                setError('Failed to update device');
                setTimeout(() => setError(null), 10000);
            }
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(null), 10000);
        }
    };

    // Fetch devices when the component mounts
    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Manage Devices</h1>
            <div className="mb-3">
                <label htmlFor="deviceName" className="form-label">
                    Add New Device
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="deviceName"
                    placeholder="Device Name"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                />
                <label htmlFor="accessToken" className="form-label mt-3">
                    Access Token
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="accessToken"
                    placeholder="Access Token"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                />
                <label htmlFor="particleId" className="form-label mt-3">
                    Particle ID
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="particleId"
                    placeholder="Particle ID"
                    value={particleId}
                    onChange={(e) => setParticleId(e.target.value)}
                />
                {/* Display error and success messages */}
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
            {/* Display the list of registered devices */}
            {devices.length === 0 ? (
                <p>No devices registered yet.</p>
            ) : (
                <ul className="list-group">
                    {devices.map((device) => (
                        <li key={device._id} className="list-group-item">
                            <div>
                                <h5>{device.name}</h5>
                                {/* Device details and update fields */}
                                <div className="mb-2">
                                    <label className="form-label">
                                        Access Token:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={device.access_token || ''}
                                        onChange={(e) =>
                                            setDevices((prevDevices) =>
                                                prevDevices.map((d) =>
                                                    d._id === device._id
                                                        ? {
                                                              ...d,
                                                              access_token:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : d
                                                )
                                            )
                                        }
                                    />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-secondary btn-sm me-2"
                                        onClick={() =>
                                            handleUpdateDevice(device._id, {
                                                access_token:
                                                    device.access_token,
                                            })
                                        }
                                    >
                                        Update Details
                                    </button>
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
