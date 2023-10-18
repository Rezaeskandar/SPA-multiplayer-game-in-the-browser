import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService';
import './Game.css'

const GameController = () => {
    const [gameId, setGameId] = useState(localStorage.getItem('gameId') || null);
    // const [guess, setGuess] = useState(localStorage.getItem('guess') || '');
    //const [gameId, setGameId] = useState(null);
    const [guess, setGuess] = useState('');
    const [result, setResult] = useState('');
    const [message, setMessage] = useState('');
    const [gameStarted, setGameStarted] = useState(false); // State to track whether the game has started
    //const [gamesPlayed, setGamesPlayed] = useState(0);
    //const [gamesWon, setGamesWon] = useState(0);
    useEffect(() => {
        localStorage.setItem('gameId', gameId);
        // localStorage.setItem('guess', guess);
    }, [gameId]);


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
                //setGamesPlayed(data.gamesPlayed);
                //setGamesWon(data.gamesWon);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs once after initial render

    const startNewGame = async () => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch('/api/game/new', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setGameId(data.gameId);
            setResult('');
            setMessage('');
            setGameStarted(true);
        } catch (error) {
            console.error('Error starting new game:', error);
        }
    };

    const submitGuess = async () => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/game/guess/${gameId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(guess)
            });
            const data = await response.json();
            setResult(data.correct ? 'Correct guess!' : 'Incorrect guess :(');
            setMessage(data.message); // Set the message received from the server
            //setGuess('');
            // You can update user's score in state here if needed
        } catch (error) {
            console.error('Error submitting guess:', error);
        }
    };

    return (
        <div>
            <h2 className="headLine">Guessing Game</h2>
            <div className="startBox">
                <button onClick={startNewGame} className="startBoxBackGround">Start New Game</button>
            </div>
            <p><strong>You need to guess a number between 1 to 10</strong> </p>
            {gameStarted && gameId && (
                <div className="guessInput">
                    <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)} />
                    <button onClick={submitGuess}>Submit Guess</button>
                    <p>{result}</p>
                    <p>{message}</p>
                    {/*<p>Games Played: {gamesPlayed}</p>*/}
                    {/*<p>Games Won: {gamesWon}</p>*/}
                </div>
            )}
        </div>
    );
};

export default GameController;
