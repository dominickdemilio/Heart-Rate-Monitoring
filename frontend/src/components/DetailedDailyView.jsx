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
            // const response = await fetch(
            //     `/api/daily-data?date=${selectedDate}`
            // ); // NEED API ENDPOINT
            // const data = await response.json();
            // setDayData(data);

            const fakeData = {
                time: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
                heartRate: [72, 76, 68, 75, 80, 70],
                oxygenSaturation: [98, 97, 96, 99, 98, 97],
            };
            setDayData(fakeData);
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
