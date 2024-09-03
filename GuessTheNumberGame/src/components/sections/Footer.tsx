import React from 'react';
import ChatBox from '../ChatBox';
import LeaderboardEntryModel from '../../model/LeaderBoardEntryModel';
import LeaderBoard from '../Leaderboard';

interface FooterProps {
  leaderboard: LeaderboardEntryModel[];
  playerName: string;
}

const Footer: React.FC<FooterProps> = ({ leaderboard, playerName }) => {
  return (
    <div className="w-full flex justify-center space-x-2 items-center">
      <LeaderBoard leaderboard={leaderboard} />
      <ChatBox playerName={playerName}/>
    </div>
  );
};

export default Footer;
