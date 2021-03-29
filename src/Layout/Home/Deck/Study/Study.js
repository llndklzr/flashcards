import React from "react";
import Card from "./Card";
import NotEnoughCards from "./NotEnoughCards";

// /decks/:deckId/study

/** A Component for an active study session. Card Component displays cards.
 *  If there are less than 3 cards displays NotEnoughCards
 * 
 *  @param {object} currentDeck
 *  the current deck corresponding with :deckId in the url
 */

function Study({ currentDeck }) {
  // TODO: deal with race condition here
  //const { deckId } = useParams();
  //const currentDeck = decks.find((deck) => deck.id === Number(deckId));
  const { name, cards } = currentDeck;
  if (cards.length < 3) {
    return (
      <div>
        <NotEnoughCards cards={cards} />
      </div>
    );
  } else {
    return (
      <div>
        {/* TODO: get deck here */}
        <h2>Study: {name}</h2>
        <Card currentDeck={currentDeck} />
      </div>
    );
  }
}

export default Study;
