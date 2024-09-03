import React from 'react'
import NumericModel from '../model/NumericModel'
import MultiplierBettingValues from '../objects/BettingValues/MultiplierBettingValues';
import BooleanModel from '../model/BooleanModel';

interface MultiplierControlProps {
  multiplier: NumericModel;
  gameIsRunning: BooleanModel;
}

const MultiplierControl: React.FC<MultiplierControlProps> = ({ multiplier, gameIsRunning }) => {

  const multiplierValue: MultiplierBettingValues = new MultiplierBettingValues(
    multiplier,
    multiplier.setValue,
    multiplier.value
  );

  return (
    <div className="p-[1px] rounded-lg border border-gray-700 shadow-lg flex flex-col items-center bg-gradient-to-r from-gray-900 to-gray-800 w-[200px] h-[61px]">
      <div className="text-gray-400 text-[10px] mb-[1px]">{multiplierValue.label}</div>
      <div className="flex items-center justify-center w-full h-[40px]">
        <button
          onClick={multiplierValue.handleDecrease}
          className={`text-white w-7 h-7 flex items-center justify-center rounded-md border border-gray-700 mr-2 
            ${gameIsRunning.value ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
          disabled={gameIsRunning.value}
        >
          -
        </button>
        <div className="p-1 w-24 rounded-lg bg-gray-900 flex items-center justify-center">
          <input
            type="text"
            value={multiplierValue.input.value}
            onChange={multiplierValue.handleInputChange}
            className={`bg-transparent spinner-hide text-white text-lg w-14 text-center border-none outline-none 
              ${gameIsRunning.value ? 'opacity-50 cursor-not-allowed bg-gray-700' : ''}`}
            disabled={gameIsRunning.value}
          />
        </div>
        <button
          onClick={multiplierValue.handleIncrease}
          className={`text-white w-7 h-7 flex items-center justify-center rounded-md border border-gray-700 ml-2 
            ${gameIsRunning.value ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
          disabled={gameIsRunning.value}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default MultiplierControl