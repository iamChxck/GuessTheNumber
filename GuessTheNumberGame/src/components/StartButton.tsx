import Button from './Button';

interface StartButtonProps {
  onStart: (stopMultiplier: number) => void;
  className?: string;
}

const StartButton: React.FC<StartButtonProps> = ({ onStart, className }) => {
  const handleStart = () => {
    const randomStop = parseFloat((Math.random() * 10).toFixed(2)); // Generate random stop value between 0 and 10
    onStart(randomStop); // Pass the random stop value to the onStart function
  };

  return (
    <Button
      text="Start"
      onClick={handleStart}
      className={className}
    />
  );
};

export default StartButton;
