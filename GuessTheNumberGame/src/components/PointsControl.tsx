import React, { useState, useEffect } from 'react';
import ValuesToChangeCard from './ValuesToChangeCard';

interface PointsControlProps {
  totalPoints: number;
  onWagerChange: (value: number) => void;
}

const PointsControl: React.FC<PointsControlProps> = ({ totalPoints, onWagerChange }) => {
  const [points, setPoints] = useState(100);

  useEffect(() => {
    onWagerChange(points);
  }, [points, onWagerChange]);

  return (
    <ValuesToChangeCard
      label="Points"
      value={points}
      increment={25}
      onValueChange={setPoints}
      totalPoints={totalPoints}
    />
  );
};

export default PointsControl;
