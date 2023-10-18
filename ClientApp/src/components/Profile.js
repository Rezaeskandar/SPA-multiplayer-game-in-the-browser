import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await authService.getAccessToken();
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="headLine">User Profile</h2>
            {profile ? (
                <div>
                    <p><strong>User Name:</strong> {profile.userName}</p>
                    <p><strong>User ID:</strong> {profile.userId}</p>
                    <p><strong>Games Played:</strong> {profile.gamesPlayed}</p>
                    <p><strong>Games Won:</strong> {profile.gamesWon}</p>
                    <p><strong>Guessing Attempts:</strong> {profile.guessingAttempts}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;

