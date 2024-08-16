import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import NameInput from '../components/NameInput';  // Import the NameInput component

interface LeaderboardEntry {
  name: string;
  points: number;
}

const HomePage: React.FC = () => {
  const initialLeaderboard: LeaderboardEntry[] = [
    { name: '-', points: 0 },
    { name: '-', points: 0 },
    { name: '-', points: 0 },
    { name: '-', points: 0 },
    { name: '-', points: 0 },
  ];

  const [totalPoints, setTotalPoints] = useState(1000);
  const [wager, setWager] = useState(100);
  const [multiplier, setMultiplier] = useState(1.0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  const [playerName, setPlayerName] = useState('');  // New state for player's name

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
  };

  const handleStart = () => {
    if (wager <= totalPoints) {
      setTotalPoints(prevPoints => prevPoints - wager);
      console.log('Starting game with multiplier:', multiplier);
    } else {
      console.error('Wager exceeds available points!');
    }
  };

  if (!playerName) {
    return <NameInput onNameSubmit={handleNameSubmit} />;
  }

  return (
    <div className="p-4 bg-gray-900 min-h-screen flex flex-col items-center">
      <Header 
  totalPoints={totalPoints} 
  wager={wager} 
  setWager={setWager} 
  multiplier={multiplier} 
  setMultiplier={setMultiplier} 
  playerName={playerName}  // Pass playerName here
/>

      <Hero 
        totalPoints={totalPoints} 
        wager={wager} 
        multiplier={multiplier} 
        onStart={handleStart} 
        setTotalPoints={setTotalPoints}  
        leaderboard={leaderboard} 
        setLeaderboard={setLeaderboard} 
      />
      <Footer leaderboard={leaderboard} />
    </div>
  );
};

export default HomePage;
