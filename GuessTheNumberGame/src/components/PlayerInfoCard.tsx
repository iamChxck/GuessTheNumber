import React, { useEffect, useState } from 'react';
import Player from '../objects/Player';
import MedalIcon from '../assets/medal.png';
import YoungMan from '../assets/young-man.png';
import Clock from '../assets/clock.png';

interface PlayerInfoCardProps {
  player: Player;
}

const PlayerInfoCard: React.FC<PlayerInfoCardProps> = ({ player }) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex space-x-4">
      {[
        { icon: MedalIcon, label: player.points?.value.toLocaleString() },
        { icon: YoungMan, label: player.name },
        { icon: Clock, label: currentTime },
      ].map(({ icon, label }, index) => (
        <div
          key={index}
          className="p-1 rounded-md flex items-center justify-start border border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 
                     w-[200px] h-[61px]"
        >
          <div className="flex items-center justify-start space-x-2 w-full h-full">
            <img src={icon} alt="Icon" className="w-8 h-8 ml-2" />
            <div className="text-white text-lg text-center flex-1">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerInfoCard;
