import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Devices() {
    const [devices, setDevices] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [particleId, setParticleId] = useState('');
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
                setTimeout(() => setError(null), 10000);
            }
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(null), 10000);
        }
    };

    const handleAddDevice = async () => {
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
                                <div className="mb-2">
                                    <label className="form-label">
                                        Particle ID:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={device.particle_id || ''}
                                        onChange={(e) =>
                                            setDevices((prevDevices) =>
                                                prevDevices.map((d) =>
                                                    d._id === device._id
                                                        ? {
                                                              ...d,
                                                              particle_id:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : d
                                                )
                                            )
                                        }
                                    />
                                </div>
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
                                                setDevices((prevDevices) =>
                                                    prevDevices.map((d) =>
                                                        d._id === device._id
                                                            ? {
                                                                  ...d,
                                                                  timeRange: {
                                                                      ...d.timeRange,
                                                                      start: e
                                                                          .target
                                                                          .value,
                                                                  },
                                                              }
                                                            : d
                                                    )
                                                )
                                            }
                                        />
                                        <input
                                            type="time"
                                            className="form-control"
                                            value={device.timeRange.end}
                                            onChange={(e) =>
                                                setDevices((prevDevices) =>
                                                    prevDevices.map((d) =>
                                                        d._id === device._id
                                                            ? {
                                                                  ...d,
                                                                  timeRange: {
                                                                      ...d.timeRange,
                                                                      end: e
                                                                          .target
                                                                          .value,
                                                                  },
                                                              }
                                                            : d
                                                    )
                                                )
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
                                            setDevices((prevDevices) =>
                                                prevDevices.map((d) =>
                                                    d._id === device._id
                                                        ? {
                                                              ...d,
                                                              frequency:
                                                                  parseInt(
                                                                      e.target
                                                                          .value
                                                                  ) || 1,
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
                                                particle_id: device.particle_id,
                                                timeRange: device.timeRange,
                                                frequency: device.frequency,
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
