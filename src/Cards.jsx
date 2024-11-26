import { useEffect, useState } from "react";

export default function Cards({ score, setScore }) {
  const [deck, setDeck] = useState(null);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (card) => {
    // Update score and clicked cards
    setDeck((prev) => {
      if (prev.clickedCards.includes(card)) {
        setScore(0);
        alert("You lose! Try again.");
        fetchDeck();
        return prev;
      } else {
        setScore(score + 1);
        return {
          ...prev,
          cards: shuffle(prev.cards),
          clickedCards: [...prev.clickedCards, card],
        };
      }
    });
  };

  const fetchDeck = () => {
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
      .then((response) => response.json())
      .then((data) =>
        setDeck({
          cards: data.cards,
          clickedCards: [],
          id: crypto.randomUUID(),
        })
      )
      .catch((error) => console.error(error));
  };

  // Fetch card deck from API
  useEffect(() => {
    fetchDeck();
  }, []);

  // Display cards
  return (
    <div className="flex flex-wrap gap-16 justify-center p-10">
      {deck &&
        deck.cards.slice(0, 5).map((card) => (
          <div
            key={card.code}
            className="flex flex-col 
                    items-center
                    hover:scale-110
                    hover:cursor-pointer
                    hover:skew-x-1
                    hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.75)]
                    transition-transform duration-500 ease-out transform-gpu
                    "
            // Add card to used pile
            onClick={() => handleCardClick(card)}
          >
            <img src={card.image} alt={card.code} className="w-20 h-auto " />
            <p className="text-white font-bold w-20 text-center">
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
