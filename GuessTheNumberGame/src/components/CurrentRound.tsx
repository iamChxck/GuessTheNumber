import React from 'react';
import Trophy from '../assets/award.png';

interface Player {
  name: string;
  points: number;
  multiplier: number;
  highlight?: boolean;
}

interface CurrentRoundProps {
  userPoints: number;
  userMultiplier: number;
  graphMultiplier: number;
  resultReady: boolean;
  aiPlayers: Player[]; // Use Player type for both player and AI
  gameStarted: boolean; // New prop to track if the game has started at least once
}

const CurrentRound: React.FC<CurrentRoundProps> = ({
  userPoints,
  userMultiplier,
  graphMultiplier,
  resultReady,
  aiPlayers,
  gameStarted,
}) => {
  const players: Player[] = [
    { name: 'You', points: userPoints, multiplier: userMultiplier, highlight: true },
    ...aiPlayers
  ];

  const determineTextColor = (playerMultiplier: number) => {
    if (!resultReady) return 'text-white';
    return playerMultiplier <= graphMultiplier ? 'text-green-500' : 'text-red-500';
  };

  const displayPointsOrWinnings = (points: number) => {
    if (!gameStarted) return '-'; // Show '-' only before the game has started for the first time
    return points.toFixed(2); // Show points after the game has started, fixed to 2 decimal places
  };

  const displayMultiplier = (multiplier: number) => {
    if (!gameStarted) return '-'; // Show '-' only before the game has started for the first time
    return multiplier.toFixed(2); // Show multiplier after the game has started, fixed to 2 decimal places
  };

  return (
    <>
      <div className="flex items-center space-x-2 mb-2 w-full">
        <img src={Trophy} alt="Trophy Icon" className="w-6 h-6" />
        <div className="text-white text-sm text-xl text-left">Current Round</div>
      </div>

      <div className="flex flex-col p-4 bg-gray-800 rounded-lg shadow-lg w-full">
        <div className="grid grid-cols-3 text-gray-400 text-sm mb-2">
          <span className="text-left">Name</span>
          <span className="text-center">Points</span>
          <span className="text-right">Multiplier</span>
        </div>
        <div className="flex flex-col space-y-2">
          {players.map((player, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 justify-between p-2 rounded-lg ${player.highlight ? 'bg-gray-700' : 'bg-gray-900'}`}
            >
              <span className={`text-left ${resultReady ? determineTextColor(player.multiplier) : 'text-white'} ${player.highlight ? 'font-bold' : ''}`}>
                {player.name}
              </span>
              <span className={`text-center ${resultReady ? determineTextColor(player.multiplier) : 'text-white'}`}>
                {displayPointsOrWinnings(player.points)}
              </span>
              <span className={`text-right ${resultReady ? determineTextColor(player.multiplier) : 'text-white'}`}>
                {displayMultiplier(player.multiplier)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CurrentRound;
