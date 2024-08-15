import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, ChartOptions } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

interface GraphProps {
  speed: number;
  running: boolean;
  stopMultiplier: number;
  onFinish?: () => void; // Optional callback for when the graph finishes
}

const Graph: React.FC<GraphProps> = ({ speed, running, stopMultiplier, onFinish }) => {
  const [data, setData] = useState<number[]>([]);
  const [steps, setSteps] = useState<number[]>([]);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);

  useEffect(() => {
    if (running) {
      // Reset graph data before starting a new run
      setData([]);
      setSteps([]);
      setCurrentMultiplier(0);

      let x = 0;
      const interval = setInterval(() => {
        // Calculate the y value for a smooth curve
        const y = parseFloat((Math.pow(x / 10, 2) * stopMultiplier).toFixed(2)); // Quadratic function for a smooth curve

        setSteps((prevSteps) => [...prevSteps, parseFloat(x.toFixed(2))]);
        setData((prevData) => [...prevData, y]);
        setCurrentMultiplier(y);

        if (x >= 10 || y >= stopMultiplier) {
          clearInterval(interval); // Stop when reaching the end of the x-axis or stopMultiplier
          if (onFinish) {
            onFinish(); // Call onFinish to re-enable the start button
          }
        }

        x += 0.1; // Increment x by 0.1 for smooth progression
      }, speed);

      return () => clearInterval(interval);
    }
  }, [running, speed, stopMultiplier, onFinish]);

  const chartData = {
    labels: steps,
    datasets: [
      {
        label: 'Multiplier',
        data: data,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4, // Increase tension for a smoother curve
        pointRadius: 0, // Hides individual data points
        borderWidth: 3, // Thicker line for better visibility
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    animation: {
      duration: 0, // Disables default animation to control drawing manually
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
          display: false, // Removes grid lines for a cleaner look
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 10, // Limit y-axis to 10
        display: false, // Hides y-axis labels
        grid: {
          display: false, // Removes grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
  };

  return (
    <div className="w-full h-96 relative">
      <Line data={chartData} options={options} />
      <div className="absolute top-[30%] left-[25%] transform -translate-y-1/2 text-red-500 text-6xl font-bold">
        {currentMultiplier.toFixed(2)}x
      </div>
    </div>
  );
};

export default Graph;
