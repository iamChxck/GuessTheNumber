import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, ChartOptions } from 'chart.js';
import BooleanModel from '../model/BooleanModel';
import NumericModel from '../model/NumericModel';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

interface GraphProps {
  speed: NumericModel;
  isRunning: BooleanModel;
  stopMultiplier: NumericModel;
  onFinish?: () => void;
}

const Graph: React.FC<GraphProps> = ({ speed, isRunning, stopMultiplier, onFinish }) => {
  const [data, setData] = useState<number[]>([]);
  const [steps, setSteps] = useState<number[]>([]);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isRunning.value) {
      setData([]);
      setSteps([]);
      setCurrentMultiplier(0);
      setIsFinished(false);

      let x = 0;
      const interval = setInterval(() => {
        const y = parseFloat((Math.pow(x / 10, 2) * stopMultiplier.value).toFixed(2));

        setSteps((prevSteps) => [...prevSteps, parseFloat(x.toFixed(2))]);
        setData((prevData) => [...prevData, y]);
        setCurrentMultiplier(y);

        if (x >= 10 || y >= stopMultiplier.value) {
          clearInterval(interval);
          setIsFinished(true);
          if (onFinish) {
            onFinish();
          }
        }

        x += 0.1;
      }, speed.value);

      return () => clearInterval(interval);
    }
  }, [isRunning.value, speed, stopMultiplier, onFinish]);

  const chartData = {
    labels: steps,
    datasets: [
      {
        label: 'Multiplier',
        data: data,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    animation: {
      duration: 0,
    },
    scales: {
      x: {
        type: 'linear',
        beginAtZero: true,
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value.toString();
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 10,
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full h-96 relative">
      <Line data={chartData} options={options} />
      <div
        className={`absolute top-[30%] left-[35%] transform -translate-y-1/2 text-[70px] font-bold ${isFinished ? 'text-red-500' : 'text-white'}`}
      >
        {currentMultiplier.toFixed(2)}x
      </div>
    </div>
  );
};

export default Graph;
