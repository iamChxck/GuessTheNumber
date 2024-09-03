import { useState } from 'react';
import Header from '../components/sections/Header';
import Player from '../objects/Player';
import NumericModel from '../model/NumericModel';
import Body from '../components/sections/Body';
import AIPlayer from '../objects/AIPlayer';
import Footer from '../components/sections/Footer';
import LeaderboardEntryModel from '../model/LeaderBoardEntryModel';
import NameInputPage from './NameInputPage';

const HomePage = () => {
    const [playerName, setPlayerName] = useState('');
    const [playerPoints, setPlayerPoints] = useState(1000);
    const [playerWager, setPlayerWager] = useState(100);
    const [playerMultiplier, setPlayerMultiplier] = useState(1.00);
    const [playerWin, setPlayerWin] = useState(0);
    const [gameIsRunning, setGameIsRunning] = useState(false);
    const [aiWager, setAIWager] = useState<number[]>([100, 100, 100, 100]);
    const [aiMultiplier, setAIMultiplier] = useState<number[]>([1, 1, 1, 1]);
    const [aiWin, setAIWin] = useState<number[]>([0, 0, 0, 0]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntryModel[]>([]);

    const aiWagerArr: NumericModel[] = aiWager.map((value, index) => ({
        value,
        setValue: (newValue) => setAIWager(prev => prev.map((w, i) => i === index ? newValue : w))
    }));

    const aiMultiplierArr: NumericModel[] = aiMultiplier.map((value, index) => ({
        value,
        setValue: (newValue) => setAIMultiplier(prev => prev.map((m, i) => i === index ? newValue : m))
    }));

    const aiWinArr: NumericModel[] = aiWin.map((value, index) => ({
        value,
        setValue: (newValue) => setAIWin(prev => prev.map((w, i) => i === index ? newValue : w))
    }));

    const currentPlayer: Player = new Player(
        playerName,
        { value: playerPoints, setValue: setPlayerPoints },
        { value: playerWager, setValue: setPlayerWager },
        { value: playerMultiplier, setValue: setPlayerMultiplier },
        { value: playerWin, setValue: setPlayerWin },
    );

    if (!playerName) { return <NameInputPage onNameSubmit={setPlayerName} />; }

    return (
        <div className="p-4 bg-gray-900 min-h-screen flex flex-col items-center">
            <Header
                wager={currentPlayer.wager}
                multiplier={currentPlayer.multiplier}
                player={currentPlayer}
                gameIsRunning={{ value: gameIsRunning, setValue: setGameIsRunning }}
            />

            <Body
                playerPoints={{ value: playerPoints, setValue: setPlayerPoints }}
                playerWager={currentPlayer.wager}
                playerMultiplier={currentPlayer.multiplier}
                gameIsRunning={{ value: gameIsRunning, setValue: setGameIsRunning }}
                leaderboard={{ value: leaderboard, setValue: setLeaderboard }}
                aiWager={aiWagerArr}
                aiMultiplier={aiMultiplierArr}
                aiWin={aiWinArr}
            />
            <Footer leaderboard={leaderboard} playerName={currentPlayer.name} />
        </div>
    );
}

export default HomePage;
