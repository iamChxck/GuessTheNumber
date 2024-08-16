import React from 'react';
import ValuesToChangeCard from './ValuesToChangeCard';

interface MultiplierControlProps {
  value: number;
  onValueChange: (value: number) => void;
}

const MultiplierControl: React.FC<MultiplierControlProps> = ({ value, onValueChange }) => {
  return (
    <ValuesToChangeCard
      label="Multiplier"
      value={value}
      increment={0.1}
      onValueChange={onValueChange}
      totalPoints={10}
      formatValue={(v) => v.toFixed(2)}
    />
  );
};

export default MultiplierControl;
