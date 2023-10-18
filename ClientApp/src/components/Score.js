import React, { useState, useEffect } from 'react';
import './Score.css';

const Score = () => {
    const [highestScores, setHighestScores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/score');
                const data = await response.json();
                setHighestScores(data);
            } catch (error) {
                console.error('Error fetching highest scores:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="headLine">Highest Scores</h2>
            <ul>
                {highestScores.map(score => (
                    <li key={score.userId}>
                        User ID: {score.userId}, User Name: {score.userName}, Highest Points: {score.highestPoints}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Score;
