import React from 'react';
import Knob from '../assets/knob.png';
import SpeedControlObj from '../objects/SpeedControlObj';

interface SpeedControlProps {
  onSpeedChange: (speed: number) => void;
  gameIsRunning: boolean;
}

const SpeedControl: React.FC<SpeedControlProps> = ({ onSpeedChange, gameIsRunning }) => {
 
  const speedControlObj: SpeedControlObj = new SpeedControlObj(onSpeedChange);

  return (
    <>
      <div className="flex items-center space-x-2 mb-2 w-full">
        <img src={Knob} alt="Speed Icon" className="w-6 h-6" />
        <div className="text-white text-sm text-xl">Speed</div>
      </div>
      <div className={`bg-gray-800 p-3 rounded-lg shadow-lg w-full ${gameIsRunning ? 'opacity-50' : ''}`}>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          defaultValue="1"
          className={`w-full appearance-none h-2 rounded-full cursor-pointer ${
            gameIsRunning ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-700'
          }`}
          onChange={speedControlObj.handleSpeedChange}
          disabled={gameIsRunning}
        />
        <div className={`flex justify-between mt-2 text-sm ${gameIsRunning ? 'text-gray-400' : 'text-red-500'}`}>
          <span>1x</span>
          <span>2x</span>
          <span>3x</span>
          <span>4x</span>
          <span>5x</span>
        </div>
      </div>
    </>
  );
};

export default SpeedControl;
