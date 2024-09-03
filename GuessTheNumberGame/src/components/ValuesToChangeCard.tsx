import React, { useState, useEffect } from 'react';
import ValuesToChangeObj from '../objects/ValuesToChangeObj';

interface ValuesToChangeCardProps {
  label: string;
  value: number;
  increment: number;
  onValueChange: (value: number) => void;
  totalPoints: number;
  formatValue?: (value: number) => string;
}

const ValuesToChangeCard: React.FC<ValuesToChangeCardProps> = ({ label, value, increment, onValueChange, totalPoints, formatValue }) => {
  const [inputValue, setInputValue] = useState(formatValue ? formatValue(value) : value.toString());

  const valuesToChangeObj: ValuesToChangeObj = new ValuesToChangeObj(
    { value: inputValue, setValue: setInputValue },
    increment,
    totalPoints,
    value,
    formatValue,
    onValueChange,
  );

  return (
    <div className="p-[1px] rounded-lg border border-gray-700 shadow-lg flex flex-col items-center bg-gradient-to-r from-gray-900 to-gray-800 w-[200px] h-[61px]">
      <div className="text-gray-400 text-[10px] mb-[1px]">{label}</div>
      <div className="flex items-center justify-center w-full h-[40px]">
        <button 
          onClick={valuesToChangeObj.handleDecrease} 
          className="text-white w-7 h-7 flex items-center justify-center hover:bg-gray-600 rounded-md border border-gray-700 mr-2"
        >
          -
        </button>
        <div className="p-1 w-24 rounded-lg bg-gray-900 flex items-center justify-center">
          <input
            type="text"
            value={inputValue}
            onChange={valuesToChangeObj.handleInputChange}
            onBlur={valuesToChangeObj.handleBlur}
            className="bg-transparent spinner-hide text-white text-lg w-14 text-center border-none outline-none"
          />
        </div>
        <button 
          onClick={valuesToChangeObj.handleIncrease} 
          className="text-white w-7 h-7 flex items-center justify-center hover:bg-gray-600 rounded-md border border-gray-700 ml-2"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ValuesToChangeCard;
