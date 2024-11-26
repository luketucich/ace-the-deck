import { useState } from "react";
import Cards from "./Cards";

export default function App() {
  const [score, setScore] = useState(0);
  // const [highScore, setHighScore] = useState(0);

  return (
    <>
      <Cards setScore={setScore} />
      <div className="flex justify-center p-10">
        <p className="text-2xl text-white font-bold">Score: {score}</p>
      </div>
    </>
  );
}
