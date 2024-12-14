import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Devices() {
    const [devices, setDevices] = useState([]);
    const [newDevice, setNewDevice] = useState('');
    const [error, setError] = useState(null);

    const defaultTimeRange = { start: '06:00', end: '22:00' };
    const defaultFrequency = 20;

    const handleAddDevice = () => {
        if (!newDevice.trim()) {
            setError('Device name cannot be empty');
            return;
        }
        const device = {
            name: newDevice.trim(),
            timeRange: { ...defaultTimeRange },
            frequency: defaultFrequency,
        };
        setDevices([...devices, device]);
        setNewDevice('');
        setError(null);
    };

    const handleRemoveDevice = (deviceName) => {
        setDevices(devices.filter((d) => d.name !== deviceName));
    };

    const handleUpdateDevice = (deviceName, key, value) => {
        setDevices(
            devices.map((device) =>
                device.name === deviceName
                    ? { ...device, [key]: value }
                    : device
            )
        );
    };

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
                    {devices.map((device, index) => (
                        <li key={index} className="list-group-item">
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>{device.name}</span>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleRemoveDevice(device.name)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="mt-3">
                                    <label className="form-label">
                                        Measurement Time Range:
                                    </label>
                                    <div className="d-flex">
                                        <input
                                            type="time"
                                            className="form-control me-2"
                                            value={device.timeRange.start}
                                            onChange={(e) =>
                                                handleUpdateDevice(
                                                    device.name,
                                                    'timeRange',
                                                    {
                                                        ...device.timeRange,
                                                        start: e.target.value,
                                                    }
                                                )
                                            }
                                        />
                                        <input
                                            type="time"
                                            className="form-control"
                                            value={device.timeRange.end}
                                            onChange={(e) =>
                                                handleUpdateDevice(
                                                    device.name,
                                                    'timeRange',
                                                    {
                                                        ...device.timeRange,
                                                        end: e.target.value,
                                                    }
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label className="form-label">
                                        Measurement Frequency (minutes):
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        value={device.frequency}
                                        onChange={(e) =>
                                            handleUpdateDevice(
                                                device.name,
                                                'frequency',
                                                parseInt(e.target.value) || 1
                                            )
                                        }
                                    />
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
