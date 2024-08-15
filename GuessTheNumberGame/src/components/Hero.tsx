import React, { useState, useEffect } from 'react';
import Button from './Button';
import Leaderboard from './Leaderboard';
import SpeedControl from './SpeedControl';
import Graph from './Graph';

interface HeroProps {
  totalPoints: number;
  wager: number;
  multiplier: number;
  onStart?: () => void; // Make onStart optional
}

const Hero: React.FC<HeroProps> = ({ totalPoints, wager, onStart = () => {} }) => {
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(10); // Initial speed set to 10 (adjust as needed)
  const [stopMultiplier, setStopMultiplier] = useState(0); // State to hold the random stop value
  const [isStartDisabled, setIsStartDisabled] = useState(false); // State to track if the start button should be disabled

  useEffect(() => {
    // Disable the start button if the wager exceeds total points or if already running
    setIsStartDisabled(running || wager > totalPoints || totalPoints === 0 || wager === 0);
  }, [running, wager, totalPoints]);

  const handleStart = () => {
    const randomStop = parseFloat((Math.random() * 10).toFixed(2)); // Generate random stop value between 0 and 10
    setStopMultiplier(randomStop); // Set the random stop value
    setRunning(true); // Start the graph
    onStart(); // Call the onStart function if provided
  };

  const handleFinish = () => {
    setRunning(false); // Re-enable the start button when the graph finishes
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="flex w-full space-x-4 p-4">
        <div className="flex flex-col space-y-4 w-1/3">
          <Button
            text={running ? "Running..." : "Start"}
            onClick={handleStart}
            className="mt-4 w-full"
            disabled={isStartDisabled}
          />
          <Leaderboard />
          <SpeedControl onSpeedChange={handleSpeedChange} /> {/* Pass handleSpeedChange */}
        </div>
        <div className="w-2/3">
          <Graph 
            speed={speed} 
            running={running} 
            stopMultiplier={stopMultiplier} 
            onFinish={handleFinish}  // Pass the handleFinish function
          /> {/* Pass speed and stopMultiplier */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
