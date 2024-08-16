import MultiplierControl from "./MultiplierControl";
import PlayerInfoCard from "./PlayerInfoCard";
import PointsControl from "./PointsControl";

interface HeaderProps {
  totalPoints: number;
  wager: number;
  setWager: (value: number) => void;
  multiplier: number;
  setMultiplier: (value: number) => void;
  playerName: string;  // Add playerName to HeaderProps
}

const Header: React.FC<HeaderProps> = ({
  totalPoints,
  setWager,
  multiplier,
  setMultiplier,
  playerName,  // Destructure playerName from props
}) => {
  return (
    <div className="flex justify-center items-center p-4 text-white space-x-4 w-full">
      <div className="flex space-x-4">
        <PointsControl 
          totalPoints={totalPoints} 
          onWagerChange={setWager}
        />
        <MultiplierControl 
          value={multiplier} 
          onValueChange={setMultiplier}
        />
      </div>
      <PlayerInfoCard 
        points={totalPoints}  // Use totalPoints prop for points
        playerName={playerName}  // Use playerName prop instead of hardcoded value
      />
    </div>
  );
}

export default Header;
