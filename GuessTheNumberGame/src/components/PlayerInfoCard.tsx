import React from 'react';
import MedalIcon from '../assets/medal.png';
import YoungMan from '../assets/young-man.png';
import Clock from '../assets/clock.png';

interface PlayerInfoCardProps {
  points: number;
  playerName: string;
  currentTime: string;
}

const PlayerInfoCard: React.FC<PlayerInfoCardProps> = ({ points, playerName, currentTime }) => {
  return (
    <div className="flex space-x-4">
      <div className="p-1 rounded-md flex items-center justify-start border border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 
                     w-[150px] h-[45px] sm:w-[180px] sm:h-[50px] md:w-[200px] md:h-[55px] lg:w-[250px] lg:h-[61px]">
        <div className="flex items-center justify-start space-x-2 w-full h-full">
          <img src={MedalIcon} alt="Medal Icon" className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ml-2" />
          <div className="text-white text-sm sm:text-md md:text-lg lg:text-xl text-center flex-1">{points.toLocaleString()}</div>
        </div>
      </div>
      <div className="p-1 rounded-md flex items-center justify-start border border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 
                     w-[150px] h-[45px] sm:w-[180px] sm:h-[50px] md:w-[200px] md:h-[55px] lg:w-[250px] lg:h-[61px]">
        <div className="flex items-center justify-start space-x-2 w-full h-full">
          <img src={YoungMan} alt="Young Man Icon" className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ml-2" />
          <div className="text-white text-sm sm:text-md md:text-lg lg:text-xl text-center flex-1">{playerName}</div>
        </div>
      </div>
      <div className="p-1 rounded-md flex items-center justify-start border border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 
                     w-[150px] h-[45px] sm:w-[180px] sm:h-[50px] md:w-[200px] md:h-[55px] lg:w-[250px] lg:h-[61px]">
        <div className="flex items-center justify-start space-x-2 w-full h-full">
          <img src={Clock} alt="Clock Icon" className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ml-2" />
          <div className="text-white text-sm sm:text-md md:text-lg lg:text-xl text-center flex-1">{currentTime}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoCard;
