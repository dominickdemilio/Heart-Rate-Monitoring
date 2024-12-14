import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Devices() {
    const [devices, setDevices] = useState([]);
    const [newDevice, setNewDevice] = useState('');
    const [error, setError] = useState(null);

    const handleAddDevice = () => {
        if (!newDevice.trim()) {
            setError('Device name cannot be empty');
            return;
        }
        setDevices([...devices, newDevice.trim()]);
        setNewDevice('');
        setError(null);
    };

    const handleRemoveDevice = (device) => {
        setDevices(devices.filter((d) => d !== device));
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
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {device}
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleRemoveDevice(device)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Devices;
