import React from 'react';

interface ControlsProps {
  balance: number;
  bet: number;
  setBet: (value: number) => void;
  dropBall: () => void;
  isDropping: boolean;
}

const Controls: React.FC<ControlsProps> = ({ balance, bet, setBet, dropBall, isDropping }) => {
  return (
    <div className="controls mt-4">
      <p>Balance: ${balance}</p>
      <label>
        Bet:
        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          min={1}
          max={balance}
          className="ml-2 p-1 rounded bg-gray-800 border border-gray-700 text-white"
        />
      </label>
      <button
        onClick={dropBall}
        disabled={isDropping || bet > balance}
        className="ml-4 p-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Drop Ball
      </button>
    </div>
  );
};

export default Controls;
