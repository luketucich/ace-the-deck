import { useState } from "react";
import Cards from "./Cards";

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <>
      <div className="flex flex-col min-h-screen gap-24 p-8 items-center justify-center">
        <Cards score={score} setScore={setScore} setHighScore={setHighScore} />
        <p className="text-2xl text-white font-bold">Score: {score}</p>
        <p className="text-2xl text-white font-bold">High Score: {highScore}</p>
      </div>
    </>
  );
}
