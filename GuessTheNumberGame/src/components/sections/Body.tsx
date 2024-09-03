import React, { useState, useEffect } from 'react';
import Game from '../../objects/Game';
import ScoreBoard from '../ScoreBoard';
import Graph from '../Graph';
import NumericModel from '../../model/NumericModel';
import BooleanModel from '../../model/BooleanModel';
import AIPlayer from '../../objects/AIPlayer';
import SpeedControl from '../SpeedControl';
import leaderBoardModel from '../../model/LeaderBoardModel';

interface BodyProps {
    playerPoints: NumericModel;
    playerWager: NumericModel;
    playerMultiplier: NumericModel;
    gameIsRunning: BooleanModel;
    leaderboard: leaderBoardModel;
    aiWager: NumericModel[];
    aiMultiplier: NumericModel[];
    aiWin: NumericModel[];
}

const Body: React.FC<BodyProps> = ({
    playerPoints,
    playerWager,
    playerMultiplier,
    gameIsRunning,
    leaderboard,
    aiWager,
    aiMultiplier,
    aiWin,
}) => {
    const [randMultiplier, setRandMultiplier] = useState(0);
    const [isResultReady, setIsResultReady] = useState(false);
    const [graphSpeed, setGraphSpeed] = useState(10);
    const [playerWin, setPlayerWin] = useState(0);


    const gameObj: Game = new Game(
        playerWager,
        playerPoints,
        playerMultiplier,
        { value: playerWin, setValue: setPlayerWin },
        { value: graphSpeed, setValue: setGraphSpeed },
        gameIsRunning,
        { value: isResultReady, setValue: setIsResultReady },
        { value: randMultiplier, setValue: setRandMultiplier },
        leaderboard,
        aiWager,
        aiMultiplier,
        aiWin,
    );

    return (
        <div className="flex justify-between items-start p-4 space-x-4 h-[65vh]">
            <div className="flex flex-col items-center space-y-6 w-[460px]">
                <button
                    onClick={gameObj.startGame}
                    className={`w-full py-3 text-white text-lg font-semibold rounded-lg shadow-lg 
                        ${gameObj.isRunning.value ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'bg-gradient-to-r from-pink-500 to-orange-500'}`}
                    disabled={gameObj.isRunning.value}
                >
                    {gameObj.isRunning.value ? 'Running...' : 'Start'}
                </button>
                <ScoreBoard
                    userWager={playerWager}
                    userMultiplier={playerMultiplier}
                    graphMultiplier={gameObj.randMultiplier.value}
                    resultReady={gameObj.isResultReady}
                    aiPlayers={gameObj.aiPlayers}
                    playerWin={{ value: playerWin, setValue: setPlayerWin }}
                />
                <SpeedControl onSpeedChange={setGraphSpeed} gameIsRunning={gameIsRunning.value} />
            </div>
            <div className="flex-1 w-[740px] h-[570px] flex items-center justify-center border border-gray-800 rounded-lg">
                <Graph
                    speed={gameObj.graphSpeed}
                    isRunning={gameObj.isRunning}
                    stopMultiplier={gameObj.randMultiplier}
                    onFinish={gameObj.finishGame}
                />
            </div>
        </div>
    );
};

export default Body;
