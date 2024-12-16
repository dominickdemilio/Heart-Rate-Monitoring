import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function WeeklySummary() {
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deviceId = 'devId'; // fix id
                const response = await fetch(
                    `/api/devices/summary/${deviceId}/weekly`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer token`, // fix token
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setSummaryData(data);
            } catch (error) {
                console.error('Failed to fetch weekly summary:', error.message);
            }
        };

        fetchData();
    }, []);

    if (!summaryData) {
        return <div className="container mt-5">Loading Weekly Summary...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Weekly Summary</h1>
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
