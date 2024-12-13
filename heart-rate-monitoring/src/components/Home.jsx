import React from 'react';

const Home = () => (
    <div className="container mt-5">
        <h1>Welcome to Heart Track</h1>
        <p>
            Heart Track is a low-cost IoT-enabled web application that helps you
            monitor your heart rate and blood oxygen saturation level. Set up
            your device, track your stats, and stay on top of your health
            effortlessly.
        </p>
        <h2>Meet the Team</h2>
        <div className="row">
            <div className="col-md-4 text-center">
                <img
                    src="/path-to-image/team-member1.jpg"
                    alt="Team Member 1"
                    className="img-fluid rounded-circle mb-2"
                />
                <h5>Team Member 1</h5>
                <p>Email: member1@example.com</p>
            </div>
            <div className="col-md-4 text-center">
                <img
                    src="/path-to-image/team-member2.jpg"
                    alt="Team Member 2"
                    className="img-fluid rounded-circle mb-2"
                />
                <h5>Team Member 2</h5>
                <p>Email: member2@example.com</p>
            </div>
            <div className="col-md-4 text-center">
                <img
                    src="/path-to-image/team-member3.jpg"
                    alt="Team Member 3"
                    className="img-fluid rounded-circle mb-2"
                />
                <h5>Team Member 3</h5>
                <p>Email: member3@example.com</p>
            </div>
        </div>
    </div>
);

export default Home;
