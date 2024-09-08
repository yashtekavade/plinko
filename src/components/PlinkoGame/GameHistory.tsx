import React from 'react';

interface GameHistoryProps {
  history: string[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  return (
    <div className="game-history mt-4">
      <h2 className="text-2xl font-bold">Game History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;
