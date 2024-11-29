import { useState } from "react";
import Cards from "./Cards";

function StartGameButton({ onStart, openModal }) {
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
          onClick={openModal}
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
  if (localStorage.getItem("highScore") === null) {
    localStorage.setItem("highScore", 0);
  }
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleStartGame = () => {
    setScore(0);
    setIsGameStarted(true);
  };

  const openModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md relative flex flex-col items-center w-80 p-8">
            <button
              onClick={openModal}
              className="absolute top-1 right-3 font-bold text-red-700 text-3xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4 text-red-700">
              How to Play
            </h2>
            <p className="mb-4 text-xl text-center">
              In Ace the Deck, your goal is to click all 52 cards without
              repeating any. Five random cards appear at a time—choose
              carefully, as clicking a card twice ends the game. Remember your
              picks and avoid repeats to win. Test your memory and aim for a
              perfect score!
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {!isGameStarted && (
          <StartGameButton onStart={handleStartGame} openModal={openModal} />
        )}
        {isGameStarted && (
          <>
            <div className="flex gap-8 items-center justify-center relative bottom-24">
              <div className="flex flex-col items-center">
                <p className="text-xl md:text-2xl text-white font-medium text-center">
                  Score
                </p>
                <div className="relative">
                  <img
                    src="chip-score.svg"
                    className="w-24 sm:w-20 md:w-24 lg:w-32"
                  />
                  <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                    {score}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl md:text-2xl text-white font-medium text-center">
                  High Score
                </p>
                <div className="relative">
                  <img
                    src="chip-highscore.svg"
                    className="w-24 sm:w-20 md:w-24 lg:w-32"
                  />
                  <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                    {localStorage.getItem("highScore")}
                  </p>
                </div>
              </div>
            </div>
            <Cards score={score} setScore={setScore} />
          </>
        )}
      </div>
    </>
  );
}
