import React, { useState, useEffect } from 'react';
import Button from './Button';
import CurrentRound from './CurrentRound';
import SpeedControl from './SpeedControl';
import Graph from './Graph';

interface HeroProps {
  totalPoints: number;
  wager: number;
  multiplier: number;
  onStart?: () => void;
  setTotalPoints: React.Dispatch<React.SetStateAction<number>>;  // Updated type here
  leaderboard: LeaderboardEntry[]; // Array for leaderboard entries
  setLeaderboard: React.Dispatch<React.SetStateAction<LeaderboardEntry[]>>; // Function to update leaderboard
}

interface AIPlayer {
  name: string;
  points: number;
  multiplier: number;
}

interface LeaderboardEntry {
  name: string;
  points: number;
}

const Hero: React.FC<HeroProps> = ({
  totalPoints,
  wager,
  multiplier,
  onStart = () => {},
  setTotalPoints,
  setLeaderboard,
}) => {
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [stopMultiplier, setStopMultiplier] = useState(0);
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [currentRoundPoints, setCurrentRoundPoints] = useState(wager);
  const [gameStarted, setGameStarted] = useState(false);

  const [aiPlayers, setAIPlayers] = useState<AIPlayer[]>([
    { name: 'CPU 1', points: 0, multiplier: 0 },
    { name: 'CPU 2', points: 0, multiplier: 0 },
    { name: 'CPU 3', points: 0, multiplier: 0 },
    { name: 'CPU 4', points: 0, multiplier: 0 },
  ]);

  useEffect(() => {
    setIsStartDisabled(running || wager > totalPoints || totalPoints === 0);
  }, [running, wager, totalPoints]);

  const generateRandomValues = () => {
    setAIPlayers(aiPlayers.map(player => ({
      ...player,
      points: Math.floor(Math.random() * 1000),
      multiplier: parseFloat((Math.random() * 10).toFixed(2)),
    })));
  };

  const updateLeaderboard = (name: string, points: number) => {
    setLeaderboard((prev: LeaderboardEntry[]) => {
      let updated = false;

      // Remove placeholder entries (i.e., `name === '-'` or `points === 0`)
      let filteredLeaderboard = prev.filter(entry => entry.name !== '-' || entry.points !== 0);

      // Update the existing entry or add a new one
      const updatedLeaderboard = filteredLeaderboard.map((entry: LeaderboardEntry) => {
        if (entry.name === name) {
          updated = true;
          return { ...entry, points };
        }
        return entry;
      });

      if (!updated) {
        updatedLeaderboard.push({ name, points });
      }

      // Sort the leaderboard by points in descending order
      return updatedLeaderboard.sort((a, b) => b.points - a.points);
    });
  };

  const handleStart = () => {
    const randomStop = parseFloat((Math.random() * 10).toFixed(2));
    setStopMultiplier(randomStop);
    setRunning(true);
    setResultReady(false);
    setCurrentRoundPoints(wager);
    setGameStarted(true);
    generateRandomValues();
    onStart();
  };

  const handleFinish = () => {
    setRunning(false);
    setResultReady(true);

    let playerWin = 0;

    if (multiplier <= stopMultiplier) {
      playerWin = wager * multiplier;
      setCurrentRoundPoints(playerWin);
      setTotalPoints((prevPoints) => prevPoints + playerWin);
    } else {
      setCurrentRoundPoints(0);
    }

    updateLeaderboard('You', playerWin); // Update leaderboard with player's current round win

    // Handle AI players
    setAIPlayers(prevAIPlayers =>
      prevAIPlayers.map(player => {
        const aiWin = player.multiplier <= stopMultiplier ? player.points * player.multiplier : 0;
        updateLeaderboard(player.name, aiWin); // Update leaderboard with AI's current round win
        return {
          ...player,
          points: aiWin, // Update AI's current round points
        };
      })
    );
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  return (
    <div className="flex justify-between items-start p-4 space-x-4 h-[65vh]">
      <div className="flex flex-col items-center space-y-6 w-[460px]">
        <Button
          text={running ? 'Running...' : 'Start'}
          onClick={handleStart}
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg shadow-lg"
          disabled={isStartDisabled}
        />
        <CurrentRound
          userPoints={currentRoundPoints}
          userMultiplier={multiplier}
          graphMultiplier={stopMultiplier}
          resultReady={resultReady}
          gameStarted={gameStarted}
          aiPlayers={aiPlayers}
        />
        <SpeedControl onSpeedChange={handleSpeedChange} />
      </div>
      <div className="flex-1 w-[740px] h-[570px] flex items-center justify-center border border-gray-800 rounded-lg">
        <Graph
          speed={speed}
          running={running}
          stopMultiplier={stopMultiplier}
          onFinish={handleFinish}
        />
      </div>
    </div>
  );
};

export default Hero;
