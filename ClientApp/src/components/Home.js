import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div>
            <h1>Hello, Viewers!</h1>
            <p>Welcome to our Single Page Application</p>
            <p>We have created a "Guessing game". We have worked frontend on React and backend in C#.</p>
            <p>To play the game you need to be registered on our appication and Select the "Game" from Navigation menu.You need to guess a number between 1 to 10. You will get 10 times attempts to to guess the right number.</p>
            <p>In one game you have the opportunity to earn highest 100 points. And every fail attempts will deduct 10 points.</p>
            <p style={{ fontWeight: 'bold', color: 'goldenrod' }}>We are working to develop this project further.</p>

        </div>
    );
  }
}
