import React from 'react'
import Player from '../../objects/Player';
import PlayerInfoCard from '../PlayerInfoCard';
import WagerControl from '../WagerControl';
import MultiplierControl from '../MultiplierControl';
import NumericModel from '../../model/NumericModel';
import BooleanModel from '../../model/BooleanModel';

interface HeaderProps {
    wager: NumericModel;
    multiplier: NumericModel;
    player: Player;
    gameIsRunning: BooleanModel;
    // time: string;
}

const Header: React.FC<HeaderProps> = ({
    wager,
    multiplier,
    player,
    gameIsRunning,
    // time,
}) => {
    return (
        <div className="flex justify-center items-center p-4 text-white space-x-4 w-full">
            <div className="flex space-x-4">
                <WagerControl wager={wager} currentPoints={{ value: player.points?.value, setValue: player.points?.setValue }} gameIsRunning={gameIsRunning} />
                <MultiplierControl multiplier={multiplier} gameIsRunning={gameIsRunning} />
            </div>
            <PlayerInfoCard player={player} />
        </div>
    )
}

export default Header