import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div>
            <h1>Hello, world!</h1>
            <p>Welcome to Single Page Application</p>
            <p>We have seleted Guessing game. We have worked frontend on React and backend in C#.</p>
            <p>You need to guess 1 to 10. You will get 10 times attempts to to guess the right number.</p>
            <p>One game you may earn 100 points. And every attempts will deducted 10 points.</p>
            <p>We will develope more option in this project.</p>
        </div>
    );
  }
}
