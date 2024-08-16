import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';

const HomePage: React.FC = () => {
  const [totalPoints, setTotalPoints] = useState(1000);
  const [wager, setWager] = useState(100);
  const [multiplier, setMultiplier] = useState(1.0);

  const handleStart = () => {
    if (wager <= totalPoints) {
      setTotalPoints(prevPoints => prevPoints - wager);
      console.log('Starting game with multiplier:', multiplier);
    } else {
      console.error('Wager exceeds available points!');
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <Header 
        totalPoints={totalPoints} 
        wager={wager} 
        setWager={setWager} 
        multiplier={multiplier} 
        setMultiplier={setMultiplier} 
      />
      <Hero 
        totalPoints={totalPoints} 
        wager={wager} 
        multiplier={multiplier} 
        onStart={handleStart} 
        setTotalPoints={setTotalPoints}  // Pass down the setTotalPoints function
      />
    </div>
  );
};

export default HomePage;
