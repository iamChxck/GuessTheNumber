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
  setTotalPoints: (points: number) => void;
}

interface AIPlayer {
  name: string;
  points: number;
  multiplier: number;
}

const Hero: React.FC<HeroProps> = ({
  totalPoints,
  wager,
  multiplier,
  onStart = () => {},
  setTotalPoints,
}) => {
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [stopMultiplier, setStopMultiplier] = useState(0);
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [currentRoundPoints, setCurrentRoundPoints] = useState(wager);
  const [gameStarted, setGameStarted] = useState(false);

  // AI Players state
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

  const handleStart = () => {
    const randomStop = parseFloat((Math.random() * 10).toFixed(2));
    setStopMultiplier(randomStop);
    setRunning(true);
    setResultReady(false);
    setCurrentRoundPoints(wager);
    setGameStarted(true);
    generateRandomValues(); // Generate random values for AI players
    onStart();
  };

  const handleFinish = () => {
    setRunning(false);
    setResultReady(true);
  
    if (multiplier <= stopMultiplier) {
      const winnings = wager * multiplier;
      setCurrentRoundPoints(winnings);
      const newTotalPoints = totalPoints + winnings;
      setTotalPoints(newTotalPoints);
    } else {
      setCurrentRoundPoints(0);
    }

    // Update AI players' winnings
    setAIPlayers(prevAIPlayers =>
      prevAIPlayers.map(player => ({
        ...player,
        points: player.multiplier <= stopMultiplier ? player.points * player.multiplier : 0,
      }))
    );
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  return (
    <div className="flex justify-between items-start p-4 space-x-4 h-[80vh]">
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
          aiPlayers={aiPlayers} // Pass AI players
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
