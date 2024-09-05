import React, { useEffect, useRef, useState } from 'react';

interface GameBoardProps {
  betAmount: number;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  risk: string;
  rows: number;
  isAutobet: boolean;
  numberOfBets: number;
  onWin: (winAmount: number) => void;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const GameBoard: React.FC<GameBoardProps> = ({
  betAmount,
  balance,
  setBalance,
  risk,
  rows,
  isAutobet,
  numberOfBets,
  onWin
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [multipliers, setMultipliers] = useState<number[]>([]);
  const [balls, setBalls] = useState<Ball[]>([]);

  const pegRadius = 3;
  const ballRadius = 5;
  const boardWidth = 400;
  const boardHeight = 600;

  useEffect(() => {
    const newMultipliers = generateMultipliers();
    setMultipliers(newMultipliers);
  }, [risk]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pegs = generatePegs();

    const animate = () => {
      ctx.clearRect(0, 0, boardWidth, boardHeight);
      drawBoard(ctx, pegs, multipliers);
      updateBalls(pegs);
      drawBalls(ctx);
      requestAnimationFrame(animate);
    };

    animate();

    if (isAutobet) {
      const interval = setInterval(() => {
        if (balls.length < numberOfBets && balance >= betAmount) {
          addBall();
          setBalance(prevBalance => prevBalance - betAmount);
        } else if (balls.length === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAutobet, numberOfBets, rows, multipliers, balance, betAmount]);

  const generatePegs = () => {
    const pegs: { x: number; y: number }[] = [];
    const horizontalSpacing = boardWidth / (rows + 1);
    const verticalSpacing = boardHeight / (rows + 2);

    for (let row = 0; row < rows; row++) {
      const pegCount = row + 2;
      const rowWidth = (pegCount - 1) * horizontalSpacing;
      const startX = (boardWidth - rowWidth) / 2;

      for (let col = 0; col < pegCount; col++) {
        pegs.push({
          x: startX + col * horizontalSpacing,
          y: (row + 1) * verticalSpacing
        });
      }
    }

    return pegs;
  };

  const generateMultipliers = () => {
    const baseMultipliers: { [key: string]: number[] } = {
      Low: [1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2],
      Medium: [2.0, 1.5, 1.2, 1.0, 0.5, 0.3, 0.3, 0.5, 1.0, 1.2, 1.5, 2.0],
      High: [5.0, 3.0, 1.5, 1.2, 0.5, 0.1, 0.1, 0.5, 1.2, 1.5, 3.0, 5.0]
    };

    return baseMultipliers[risk];
  };

  const drawBoard = (
    ctx: CanvasRenderingContext2D,
    pegs: { x: number; y: number }[],
    multipliers: number[]
  ) => {
    ctx.fillStyle = '#1e2328';
    ctx.fillRect(0, 0, boardWidth, boardHeight);

    pegs.forEach(peg => {
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, pegRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    });

    const slotWidth = boardWidth / multipliers.length;
    multipliers.forEach((multiplier, index) => {
      ctx.fillStyle = getMultiplierColor(multiplier);
      ctx.fillRect(index * slotWidth, boardHeight - 30, slotWidth, 30);
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(multiplier + 'x', index * slotWidth + slotWidth / 2, boardHeight - 10);
    });
  };

  const getMultiplierColor = (multiplier: number) => {
    if (multiplier >= 3) return 'red';
    if (multiplier >= 1.2) return 'orange';
    return 'yellow';
  };

  const addBall = () => {
    setBalls(prevBalls => [...prevBalls, {
      x: boardWidth / 2,
      y: 0,
      vx: 0,
      vy: 0
    }]);
  };

  const updateBalls = (pegs: { x: number; y: number }[]) => {
    setBalls(prevBalls => prevBalls.map(ball => {
      ball.vy += 0.2;
      ball.x += ball.vx;
      ball.y += ball.vy;

      pegs.forEach(peg => {
        const dx = ball.x - peg.x;
        const dy = ball.y - peg.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ballRadius + pegRadius) {
          const nx = dx / distance;
          const ny = dy / distance;
          const dotProduct = ball.vx * nx + ball.vy * ny;
          ball.vx = ball.vx - 2 * dotProduct * nx;
          ball.vy = ball.vy - 2 * dotProduct * ny;
          ball.vx += (Math.random() - 0.5) * 0.5;
          const moveDistance = ballRadius + pegRadius - distance + 1;
          ball.x += nx * moveDistance;
          ball.y += ny * moveDistance;
          ball.vx *= 0.8;
          ball.vy *= 0.8;
        }
      });

      if (ball.x < ballRadius) {
        ball.x = ballRadius;
        ball.vx *= -0.8;
      } else if (ball.x > boardWidth - ballRadius) {
        ball.x = boardWidth - ballRadius;
        ball.vx *= -0.8;
      }

      return ball;
    }));

    setBalls(prevBalls => prevBalls.filter(ball => {
      if (ball.y > boardHeight) {
        const slot = Math.floor(ball.x / (boardWidth / multipliers.length));
        const winAmount = betAmount * multipliers[slot];
        onWin(winAmount);
        return false;
      }
      return true;
    }));
  };

  const drawBalls = (ctx: CanvasRenderingContext2D) => {
    balls.forEach(ball => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'orange';
      ctx.fill();
    });
  };

  const handleManualBet = () => {
    if (balance >= betAmount) {
      setBalance(prevBalance => prevBalance - betAmount);
      addBall();
    } else {
      alert("Insufficient balance for bet!");
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={boardWidth}
        height={boardHeight}
        className="border border-gray-700 rounded-lg"
      />
      <button
        onClick={handleManualBet}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Place Bet
      </button>
    </div>
  );
};

export default GameBoard;