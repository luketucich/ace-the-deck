import { useEffect, useState } from "react";

export default function Cards({ setScore }) {
  // State variables for deck and animation
  const [deck, setDeck] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Shuffle the cards
  const shuffle = (array) => {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  };

  function animateCards(shuffledDeck) {
    const cards = document.querySelectorAll("#cardFace");
    cards.forEach((card, index) => {
      card.animate(
        [
          { transform: "rotateY(0deg)" }, // Front face visible
          { transform: "rotateY(90deg)" }, // Mid flip to back
          { transform: "rotateY(180deg)" }, // Back face visible
          { transform: "rotateZ(180deg)" }, // Flip to front
        ],
        {
          duration: 1500, // Full flip duration
          iterations: 1,
          easing: "ease-in-out",
        }
      );

      // Change the card image to card back at the halfway point
      setTimeout(() => {
        card.src = "https://www.deckofcardsapi.com/static/img/back.png";
      }, 600);

      // Change the card image to new card at the end point
      setTimeout(() => {
        card.src = shuffledDeck[index].image;
      }, 1050);
    });
  }

  // Handle card click
  const handleCardClick = (card) => {
    if (isAnimating) return; // Prevent interaction during animation

    const shuffledDeck = shuffle(deck.cards);
    setIsAnimating(true);
    animateCards(shuffledDeck);

    // Start animation first, then delay state update
    setTimeout(() => {
      setDeck((prev) => {
        if (prev.clickedCards.includes(card)) {
          fetchDeck(); // Reset the deck if losing
          setScore(0);
          alert("You lose! Try again.");
          return prev;
        } else {
          return {
            ...prev,
            cards: shuffledDeck,
            clickedCards: [...prev.clickedCards, card],
          };
        }
      });

      // Update the score
      if (!deck?.clickedCards.includes(card)) {
        setScore((prevScore) => prevScore + 1);
      }

      setIsAnimating(false); // Reset animation state
    }, 1500); // Delay to match animation duration
  };

  // Fetch card deck from API
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

  // Fetch deck on mount
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
            <img
              src={card.image}
              alt={card.code}
              className="w-20 h-auto transition-all ease-in-out"
              id="cardFace"
            />
          </div>
        ))}
    </div>
  );
}
