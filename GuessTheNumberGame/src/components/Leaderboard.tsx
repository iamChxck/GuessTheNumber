import React from 'react'

const Leaderboard = () => {
  return (
    <div className="flex flex-col p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="text-white mb-2">Current Round</div>
      {/* Leaderboard placeholder */}
      <div className="flex flex-col">
        <div className="flex justify-between text-white">
          <span>Name</span>
          <span>Points</span>
          <span>Multiplier</span>
        </div>
        {/* Player rows can be dynamically generated here */}
      </div>
    </div>
  )
}

export default Leaderboard