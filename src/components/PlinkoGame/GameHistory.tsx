import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface GameHistoryProps {
  gameHistory: { bet: number; win: number }[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ gameHistory }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Game History</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={gameHistory}>
            <XAxis dataKey="bet" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="win" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GameHistory;