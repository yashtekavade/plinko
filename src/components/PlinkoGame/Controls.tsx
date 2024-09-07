import React, { useState } from 'react';

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
  const [addAmount, setAddAmount] = useState<number>(0);

  const handleStartAutobet = () => {
    if (balance >= betAmount * numberOfBets) {
      setIsAutobet(true);
    } else {
      alert("Insufficient balance for autobet!");
    }
  };

  const handleAddMoney = () => {
    if (addAmount > 0) {
      setBalance(prevBalance => prevBalance + addAmount);
      setAddAmount(0);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Balance: ${balance.toFixed(2)}</h2>
      <div className="space-y-2 mb-4">
        <label className="block">Add Money</label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <button
            onClick={handleAddMoney}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block">Bet Amount</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Math.max(0, parseFloat(e.target.value) || 0))}
          className="w-full p-2 bg-gray-700 rounded"
        />
      </div>
      {/* Rest of the controls remain the same */}
    </div>
  );
};

export default Controls;