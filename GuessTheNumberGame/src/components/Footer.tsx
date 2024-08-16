import React from 'react';
import Leaderboard from './Leaderboard'; // Import the Leaderboard component
import ChatBox from './ChatBox'

interface LeaderboardEntry {
  name: string;
  points: number;
}

interface FooterProps {
  leaderboard: LeaderboardEntry[]; // Pass the leaderboard data to the Footer
}

const Footer: React.FC<FooterProps> = ({ leaderboard }) => {
  return (
    <div className="w-full flex justify-center space-x-2 items-center">
      <Leaderboard leaderboard={leaderboard} />
      <ChatBox />
    </div>
  );
};

export default Footer;
