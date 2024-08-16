Guess The Number Game
Overview
Guess The Number Game is an interactive web application where players guess when a multiplier will freeze, placing bets accordingly. The game includes AI players, a leaderboard, and a chat feature powered by WebSockets. The application is built using React with TypeScript, Tailwind CSS for styling, and a WebSocket server for real-time chat communication.

Features
Real-time Multiplayer Game: Players and AI compete by betting on when the multiplier will stop.
Leaderboard: Displays the top five players based on their winnings.
Chat Feature: Allows players to communicate in real-time during the game, with AI players sending random messages.

Installation
Clone the repository:

git clone https://github.com/your-username/guess-the-number-game.git
cd guess-the-number-game
Install dependencies for the main application:

npm install
Navigate to the WebSocket server directory and install its dependencies:

cd websocket-server
npm install
cd ..
Running the Application
Development Mode
Start the WebSocket server:

From the root directory, run:
npm run server

Start the React application:
In a separate terminal, from the root directory, run:
npm run dev

Access the application:

Open your browser and navigate to http://localhost:3000.

Production Build
To create a production build, run:

npm run build
This will generate the static files in the dist/ directory.

Usage
Playing the Game: Place your bet and start the game. The multiplier will increase, and you need to guess when it will freeze.
Leaderboard: The leaderboard ranks players based on their highest winnings in a round.
Chat: Use the chat box to communicate with other players. AI players will also send random messages at the start of the game.
WebSocket Server
The WebSocket server is located in the websocket-server/ directory and handles real-time communication for the chat feature. It listens for incoming messages and broadcasts them to all connected clients.