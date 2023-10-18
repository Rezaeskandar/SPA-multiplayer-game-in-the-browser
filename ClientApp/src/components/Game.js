import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService';
import './Game.css'

const GameController = () => {
    const [gameId, setGameId] = useState(null);
    const [guess, setGuess] = useState('');
    const [result, setResult] = useState('');
    const [message, setMessage] = useState('');
    const [gameStarted, setGameStarted] = useState(false); // State to track whether the game has started
    const [incompletedGame, setIncompletedGame] = useState(false);
    const [userId, setUserId] = useState('');


    //const [gamesPlayed, setGamesPlayed] = useState(0);
    //const [gamesWon, setGamesWon] = useState(0);

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
                return data;
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData().then((response) => {
            setUserId(response.userId);
        });

    }, []); // Empty dependency array ensures useEffect runs once after initial render


    useEffect(() => {
        const cachedGame = localStorage.getItem('game');
        if (cachedGame && cachedGame !== 'undefined') {
            const parsedGame = JSON.parse(cachedGame)
            if (gameId == null) {
                setGameId(parsedGame.gameId);
            }

            if (!gameStarted) {
                console.log("parsedGame", JSON.stringify(parsedGame));

                if (parsedGame.userId == userId) {
                    setIncompletedGame(true);
                }
            }
        }

    }, [gameId, userId]);


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
            setIncompletedGame(false);
            localStorage.setItem('game', JSON.stringify({ gameId: data.gameId, userId: userId }));
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

            //remove cached game from local storage
            if (data.correct) {
                //setGameId(null);
                //setIncompletedGame(false);
                localStorage.removeItem("game");
            }
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

            {incompletedGame ? (
                <p>Start previous game where you have left gameId: {gameId}; if you want to start new game click on Start New Game button</p>
            ) : (<p></p>)} 

            {(gameStarted || incompletedGame)  && (
                <div className="guessInput">
                    <p>
                        <input type="number" className="guessInputBox" value={guess} onChange={(e) => setGuess(e.target.value)} />
                    </p>
                    <p>
                        <button onClick={submitGuess} className="guessInputButton">Submit Guess</button>
                    </p>
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
