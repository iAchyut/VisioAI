import React from 'react';
import './PlantCarePath.css'; // Assuming external CSS for styling

const PlantCarePath = () => {
    const steps = [
        {
            title: 'Sustainability',
            description: 'Promote eco-friendly practices and use sustainable materials in all aspects of plant care.',
            icon: 'https://cdn-icons-png.flaticon.com/512/414/414927.png',
        },
        {
            title: 'Education',
            description: 'Educate the community about proper plant care techniques and the importance of green living.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1946/1946418.png',
        },
        {
            title: 'Community Engagement',
            description: 'Foster a supportive community of plant enthusiasts through workshops and events.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1256/1256653.png',
        },
        {
            title: 'Brand Trust',
            description: 'Build trust through transparency, reliability, and a consistent focus on customer satisfaction.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1443/1443792.png',
        },
    ];

    return (
        <div className="container">
            <div className="header">
                <h1>Path to Becoming a Trusted Name in Plant Care</h1>
            </div>
            <div className="path">
                {steps.map((step, index) => (
                    <div className={`step ${index % 2 === 0 ? 'even' : ''}`} key={index}>
                        <img src={step.icon} alt={step.title} className="icon" />
                        <div className="text">
                            <strong>{step.title}:</strong> {step.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlantCarePath;