# SPA-multiplayer-game-in-the-browser
SPA - ASP.Net core react (Guessing game, profile status, historical highscore, Api, SignalR{notification}).  
Welcome to our Game App. We have built this Game using ASP.NET Core with React.js templates in .NET 6 framework, This Game will give you a seamless gaming experience, combining engaging gameplay, user-friendly interfaces, and secure authentication features. With individual accounts authentication this Game is the ultimate destination for gaming enthusiasts.

## Features
#### Login and Registration  
Login Page: Users can securely log in to their accounts, ensuring a safe gaming environment.  
New User Registration: New players can register and create accounts to access all the gaming features.

#### Game Pages
Gameplay Page: Enjoy the Guessing game where every fail attempt will deduct your points.  
Persisted Game State: Your game progress is saved, allowing you to continue from where you left off.  
Server-Side Game Logic: All game logic is calculated server-side, ensuring fairness and preventing cheating.
#### User Profile
Profile Page: View your gaming statistics, including the number of games played, victories, and more.  
Authentication: Profile and game pages are accessible only to authorized users, guaranteeing data privacy.
#### Highscore Leaderboards
 Scores: Compete with players globally and locally for the top position on leaderboards.
#### Technology Stack
Backend: ASP.NET Core API with Entity Framework and SignalR for real-time Notification.  
Frontend: React.js for a dynamic and interactive user interface.  
Database: Well-designed database structures using Entity Framework Code-First approach.



## Structure of Project:
|   Tasks     |   Framwork    |  Effect  |
|-----|--------|-------|
|C# |  Rest API   | ASP.Net React
|React |  UseEffect, UseState, FetchData   | Fetching Data via Endpoints
|Tamplete | Entity Framework, React, LinQ | Controllers
|Database | SQL | Database Diagram below
|Model | VS C# & .NET Core 6   | Get and Post
|Authentication | ASP.NET Core 6 - 6.0.23  | Get and Post
|Connection |  JSON   |  Global Datbase

## Database Structure
Users Table: Stores user information, including username, password hash, email, and gaming statistics.  
Games Table: Records game details.  
Highscores Table: Contains daily and historical highscores for different games.
## Database diagram
The diagram includes automitacally generated authentication and authorization relations as well as our game database design and their relationships.

![alt text](database-diagram.png)

## Team

- [Md Ruhul Amin](https://github.com/Md-Ruhul-Amin-Rony)
- [Tasmia Zahin](https://github.com/tasmiazahin)
- [Reza](https://github.com/Rezaeskandar)
- [Md. Kamrul Hasan](https://github.com/chasmkhasan)
