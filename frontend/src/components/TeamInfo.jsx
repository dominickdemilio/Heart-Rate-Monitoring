import React from 'react';
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>Meet the Team</h1>
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '16px',
                            textAlign: 'center',
                            width: '200px',
                        }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            style={{
                                width: '100%',
                                borderRadius: '50%',
                                marginBottom: '12px',
                            }}
                        />
                        <h3>{member.name}</h3>
                        <p>
                            <strong>Major:</strong> {member.major}
                        </p>

                        <p
                            style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                fontSize: '11px',
                            }}
                        >
                            <strong>Email:</strong>{' '}
                            <a href={`mailto:${member.email}`}>
                                {member.email}
                            </a>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamInfo;
