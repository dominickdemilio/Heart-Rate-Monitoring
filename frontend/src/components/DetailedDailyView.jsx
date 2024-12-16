import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chart.js/auto';

function DetailedDailyView() {
    const [dayData, setDayData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split('T')[0]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deviceId = 'devID';
                const response = await fetch(
                    `/api/devices/details/${deviceId}/daily?date=${selectedDate}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer token`,
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
    }, [selectedDate]);

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
