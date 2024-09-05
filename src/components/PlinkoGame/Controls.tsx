import React from 'react';

interface ControlsProps {
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  risk: string;
  setRisk: React.Dispatch<React.SetStateAction<string>>;
  rows: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  numberOfBets: number;
  setNumberOfBets: React.Dispatch<React.SetStateAction<number>>;
  isAutobet: boolean;
  setIsAutobet: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: React.FC<ControlsProps> = ({
  betAmount,
  setBetAmount,
  balance,
  setBalance,
  risk,
  setRisk,
  rows,
  setRows,
  numberOfBets,
  setNumberOfBets,
  isAutobet,
  setIsAutobet
}) => {
  const handleStartAutobet = () => {
    if (balance >= betAmount * numberOfBets) {
      setIsAutobet(true);
    } else {
      alert("Insufficient balance for autobet!");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Balance: ${balance.toFixed(2)}</h2>
      <div className="space-y-2">
        <label className="block">Bet Amount</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value))}
          className="w-full p-2 bg-gray-700 rounded"
        />
      </div>
      <div className="space-y-2">
        <label className="block">Risk</label>
        <select
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block">Rows</label>
        <select
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
          className="w-full p-2 bg-gray-700 rounded"
        >
          <option>8</option>
          <option>12</option>
          <option>16</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block">Number of Bets</label>
        <input
          type="number"
          value={numberOfBets}
          onChange={(e) => setNumberOfBets(parseInt(e.target.value))}
          className="w-full p-2 bg-gray-700 rounded"
        />
      </div>
      <button
        onClick={handleStartAutobet}
        className="w-full p-2 bg-green-500 text-white rounded mt-2"
      >
        Start Autobet
      </button>
    </div>
  );
};

export default Controls;