import MultiplierControl from "./MultiplierControl";
import PlayerInfoCard from "./PlayerInfoCard";
import PointsControl from "./PointsControl";

interface HeaderProps {
  totalPoints: number;
  wager: number;
  setWager: (value: number) => void;
  multiplier: number;
  setMultiplier: (value: number) => void;
}

const Header: React.FC<HeaderProps> = ({ totalPoints, setWager, multiplier, setMultiplier }) => {
  return (
    <div className="flex justify-center items-center p-4 text-white space-x-4">
      <div className="flex space-x-4">
        <PointsControl 
          totalPoints={totalPoints} 
          onWagerChange={setWager} // Pass this to PointsControl
        />
        <MultiplierControl 
          value={multiplier} 
          onValueChange={setMultiplier}
        />
      </div>
      <PlayerInfoCard 
        points={totalPoints} 
        playerName="Thomas" 
        currentTime="21:30" 
      />
    </div>
  );
}

export default Header;
