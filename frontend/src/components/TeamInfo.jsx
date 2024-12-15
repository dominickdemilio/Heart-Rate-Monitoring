import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import reeceImage from '../assets/reece.jpg';
import domImage from '../assets/dom.jpg';
import colinImage from '../assets/colin.jpg';

const TeamInfo = () => {
    const teamMembers = [
        {
            name: 'Reece Chambers',
            email: 'chambersre@arizona.edu',
            major: 'Electrical and Computer Engineering',
            image: reeceImage,
        },
        {
            name: "Dominick D'Emilio",
            email: 'dominickdemilio@arizona.edu',
            major: 'Software Engineering',
            image: domImage,
        },
        {
            name: 'Colin Kruger',
            email: 'ckruger@arizona.edu',
            major: 'Electrical and Computer Engineering',
            image: colinImage,
        },
    ];

    return (
        <div className="container text-center my-5">
            <h1 className="mb-4">Meet the Team</h1>
            <div className="row g-4">
                {teamMembers.map((member, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4">
                        <div className="card h-100">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="card-img-top rounded-circle p-3"
                                style={{ width: '70%', margin: '0 auto' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{member.name}</h5>
                                <p className="card-text">
                                    <strong>Major:</strong> {member.major}
                                </p>
                                <p className="card-text">
                                    <strong>Email:</strong>{' '}
                                    <a href={`mailto:${member.email}`}>
                                        {member.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamInfo;
