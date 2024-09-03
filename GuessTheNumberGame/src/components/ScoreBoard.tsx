import React from 'react';
import Trophy from '../assets/award.png';
import NumericModel from '../model/NumericModel';
import BooleanModel from '../model/BooleanModel';
import AIPlayer from '../objects/AIPlayer';
import ScoreBoardObj from '../objects/ScoreBoardObj';

interface ScoreBoardProps {
    userWager: NumericModel;
    userMultiplier: NumericModel;
    graphMultiplier: number;
    resultReady: BooleanModel;
    aiPlayers: AIPlayer[];
    playerWin: NumericModel;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
    userWager,
    userMultiplier,
    graphMultiplier,
    resultReady,
    aiPlayers,
    playerWin,
}) => {
    const scoreboardObj: ScoreBoardObj = new ScoreBoardObj([
        { 
            name: 'You',
            win: playerWin, 
            wager: userWager, 
            multiplier: userMultiplier, 
            nameHighlight: true 
        },
        ...aiPlayers
    ], resultReady, graphMultiplier);

    return (
        <>
            <div className="flex items-center space-x-2 mb-2 w-full">
                <img src={Trophy} alt="Trophy Icon" className="w-6 h-6" />
                <div className="text-white text-sm text-xl text-left">Current Round</div>
            </div>

            <div className="flex flex-col p-4 bg-gray-800 rounded-lg shadow-lg w-full">
                <div className="grid grid-cols-3 text-gray-400 text-sm mb-2">
                    <span className="text-left">Name</span>
                    <span className="text-center">Points</span>
                    <span className="text-right">Multiplier</span>
                </div>
                <div className="flex flex-col space-y-2">
                    {scoreboardObj.players.map((player, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-3 justify-between p-2 rounded-lg ${player.nameHighlight ? 'bg-gray-700' : 'bg-gray-900'}`}
                        >
                            <span className={`text-left ${resultReady.value ? scoreboardObj.determineTextColor(player.multiplier.value) : 'text-white'} ${player.nameHighlight  ? 'font-bold' : ''}`}>
                                {player.name}
                            </span>
                            <span className={`text-center ${resultReady.value ? scoreboardObj.determineTextColor(player.multiplier.value) : 'text-white'}`}>
                                {resultReady.value ? scoreboardObj.displayWinnings(player.win.value) : scoreboardObj.placeholder[index].points}
                            </span>
                            <span className={`text-right ${resultReady.value ? scoreboardObj.determineTextColor(player.multiplier.value) : 'text-white'}`}>
                                {resultReady.value ? scoreboardObj.displayWinnings(player.multiplier.value) : scoreboardObj.placeholder[index].multiplier}
                            </span>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    );
};

export default ScoreBoard;
