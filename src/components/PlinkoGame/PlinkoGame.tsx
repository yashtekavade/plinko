import React, { useState } from 'react';
import GameHistory from './GameHistory';
import Controls from './Controls';

const rows = 12;
const cols = 9;

const PlinkoGame: React.FC = () => {
  const [ballPosition, setBallPosition] = useState<number[]>([0, Math.floor(cols / 2)]);
  const [isDropping, setIsDropping] = useState(false);
  const [bet, setBet] = useState<number>(10);
  const [balance, setBalance] = useState<number>(100);
  const [result, setResult] = useState<string>('');
  const [gameHistory, setGameHistory] = useState<string[]>([]);

  const dropBall = () => {
    setIsDropping(true);
    let position = ballPosition;
    const interval = setInterval(() => {
      if (position[0] < rows - 1) {
        const randomDirection = Math.random() > 0.5 ? 1 : -1;
        const newCol = Math.max(0, Math.min(cols - 1, position[1] + randomDirection));
        setBallPosition([position[0] + 1, newCol]);
        position = [position[0] + 1, newCol];
      } else {
        clearInterval(interval);
        setIsDropping(false);
        determineOutcome(position[1]);
      }
    }, 300);
  };

  const determineOutcome = (finalCol: number) => {
    const winningColumns = [3, 4, 5];
    if (winningColumns.includes(finalCol)) {
      const winnings = bet * 2;
      setBalance(balance + winnings);
      setResult(`You won ${winnings}!`);
      setGameHistory([...gameHistory, `Won ${winnings}`]);
    } else {
      setBalance(balance - bet);
      setResult('You lost the bet.');
      setGameHistory([...gameHistory, 'Lost']);
    }
  };

  return (
    <div className="plinko-game">
      <div className="game-board">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`board-cell ${ballPosition[0] === rowIndex && ballPosition[1] === colIndex ? 'ball' : ''}`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <Controls balance={balance} bet={bet} setBet={setBet} dropBall={dropBall} isDropping={isDropping} />
      <p>{result}</p>

      <GameHistory history={gameHistory} />
    </div>
  );
};

export default PlinkoGame;
