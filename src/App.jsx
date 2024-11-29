import { useState } from "react";
import Cards from "./Cards";

function StartGameButton({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="logo.png" width={500} className="mb-3"></img>
      <div className="flex flex-col gap-5">
        <button
          onClick={onStart}
          className="font-bold bg-red-700 border-b-4 border-white text-white rounded-md p-4 pl-14 pr-14
          text-xl
          transition
          duration-500
          hover:scale-110
          hover:cursor-pointer
        hover:bg-white
        hover:text-red-700"
        >
          Start Game
        </button>
        <button
          onClick={onStart}
          className="font-bold bg-red-700 border-b-4 border-white text-white rounded-md p-4 pl-14 pr-14
          text-xl
          transition
          duration-500
          hover:scale-110
          hover:cursor-pointer
        hover:bg-white
        hover:text-red-700"
        >
          How to Play
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setScore(0);
    setIsGameStarted(true);
  };

  return (
    <div className="flex flex-col min-h-screen gap-24 p-8 items-center justify-center">
      {!isGameStarted && <StartGameButton onStart={handleStartGame} />}
      {isGameStarted && (
        <>
          <Cards
            score={score}
            setScore={setScore}
            setHighScore={setHighScore}
          />
          <div className="flex flex-col gap-5 justify-center items-center">
            <p className="text-2xl text-white font-bold">Score: {score}</p>
            <p className="text-2xl text-white font-bold">
              High Score: {highScore}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
