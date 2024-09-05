import React, { useState } from 'react';
import GameBoard from './GameBoard';
import Controls from './Controls';
import GameHistory from './GameHistory';
import { Alert, AlertDescription, AlertTitle } from '../ui/Alert';
import { AlertCircle } from 'lucide-react';

const PlinkoGame: React.FC = () => {
  const [betAmount, setBetAmount] = useState<number>(0.00000000);
  const [balance, setBalance] = useState<number>(1000);
  const [risk, setRisk] = useState<string>('Medium');
  const [rows, setRows] = useState<number>(12);
  const [numberOfBets, setNumberOfBets] = useState<number>(1);
  const [isAutobet, setIsAutobet] = useState<boolean>(false);
  const [gameHistory, setGameHistory] = useState<{ bet: number; win: number }[]>([]);

  const handleWin = (winAmount: number) => {
    setBalance(prevBalance => prevBalance + winAmount);
    setGameHistory(prevHistory => [
      { bet: betAmount, win: winAmount },
      ...prevHistory.slice(0, 9)
    ]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/4 space-y-4">
        <Controls
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          balance={balance}
          setBalance={setBalance}
          risk={risk}
          setRisk={setRisk}
          rows={rows}
          setRows={setRows}
          numberOfBets={numberOfBets}
          setNumberOfBets={setNumberOfBets}
          isAutobet={isAutobet}
          setIsAutobet={setIsAutobet}
        />
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Reminder</AlertTitle>
          <AlertDescription>
            Gambling can be addictive. Please play responsibly.
          </AlertDescription>
        </Alert>
      </div>
      <div className="w-full md:w-3/4 space-y-4">
        <GameBoard
          betAmount={betAmount}
          balance={balance}
          setBalance={setBalance}
          risk={risk}
          rows={rows}
          isAutobet={isAutobet}
          numberOfBets={numberOfBets}
          onWin={handleWin}
        />
        <GameHistory gameHistory={gameHistory} />
      </div>
    </div>
  );
};

export default PlinkoGame;