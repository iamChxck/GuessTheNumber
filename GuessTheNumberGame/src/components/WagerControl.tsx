import React from 'react'
import WagerBettingValues from '../objects/BettingValues/WagerBettingValues';
import NumericModel from '../model/NumericModel';
import BooleanModel from '../model/BooleanModel';

interface WagerControlProps {
    wager: NumericModel;
    currentPoints: NumericModel;
    gameIsRunning: BooleanModel;
}

const WagerControl: React.FC<WagerControlProps> = ({ wager, currentPoints, gameIsRunning }) => {

    const wagerObj: WagerBettingValues = new WagerBettingValues(
        wager,
        wager.setValue,
        currentPoints.value,
    )

    return (
        <div className="p-[1px] rounded-lg border border-gray-700 shadow-lg flex flex-col items-center bg-gradient-to-r from-gray-900 to-gray-800 w-[200px] h-[61px]">
            <div className="text-gray-400 text-[10px] mb-[1px]">{wagerObj.label}</div>
            <div className="flex items-center justify-center w-full h-[40px]">
                <button
                    onClick={wagerObj.handleDecrease}
                    className={`text-white w-7 h-7 flex items-center justify-center rounded-md border border-gray-700 mr-2 
                        ${gameIsRunning.value ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
                    disabled={gameIsRunning.value}
                >
                    -
                </button>
                <div className="p-1 w-24 rounded-lg bg-gray-900 flex items-center justify-center">
                    <input
                        type="text"
                        value={wagerObj.input.value}
                        onChange={wagerObj.handleInputChange}
                        className={`bg-transparent spinner-hide text-white text-lg w-14 text-center border-none outline-none 
                            ${gameIsRunning.value ? 'opacity-50 cursor-not-allowed bg-gray-700' : ''}`}
                        disabled={gameIsRunning.value}
                    />
                </div>
                <button
                    onClick={wagerObj.handleIncrease}
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

export default WagerControl