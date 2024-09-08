import React from 'react';
import PlinkoGame from './components/PlinkoGame/PlinkoGame';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Plinko Gambling Game</h1>
      <PlinkoGame />
    </div>
  );
}

export default App;
