import { useEffect, useState } from "react";

export default function Cards() {
  const [deck, setDeck] = useState(null);

  // Fetch card deck from API
  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=5")
      .then((response) => response.json())
      .then((data) => setDeck(data.cards))
      .catch((error) => console.error(error));
  }, []);

  // Display cards
  return (
    <div className="flex flex-col gap-5 justify-center items-center p-10">
      {deck &&
        deck.map((card) => (
          <div
            key={crypto.randomUUID()}
            className="flex flex-col 
                    items-center
                    hover:scale-110
                    hover:cursor-pointer
                    hover:skew-x-1
                    hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.75)]
                    transition-transform duration-500 ease-out transform-gpu
                    w-max
                    h-max
                    "
          >
            <img src={card.image} alt={card.code} className="w-16 h-auto " />
            <p className="text-white font-bold">
              {card.value.charAt(0) +
                card.value.substring(1).toLowerCase() +
                " of " +
                card.suit.charAt(0) +
                card.suit.substring(1).toLowerCase()}
            </p>
          </div>
        ))}
    </div>
  );
}
