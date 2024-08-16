import React from 'react';
import RankingIcon from '../assets/top-three.png';

interface LeaderboardEntry {
  name: string;
  points: number;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  const placeholders = [
    { name: '-', points: 0 },
    { name: '-', points: 0 },
    { name: '-', points: 0 },
    { name: '-', points: 0 },
    { name: '-', points: 0 },
  ];

  const displayData = leaderboard.length === 0 ? placeholders : leaderboard;

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <img src={RankingIcon} alt="Trophy Icon" className="w-6 h-6" />
        <div className="text-white text-sm text-xl">Ranking</div>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-[600px] leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">No.</th>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((entry, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm text-white">{index + 1}</td>
                <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm text-white">{entry.name}</td>
                <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm text-white">{entry.points.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
