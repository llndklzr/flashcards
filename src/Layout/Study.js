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

function Study({ currentDeck, loading }) {
  // TODO: deal with race condition here
  //const { deckId } = useParams();
  //const currentDeck = decks.find((deck) => deck.id === Number(deckId));
  const { name, cards } = currentDeck;
  const renderView = (
    <div>
      <h2>Study: {name}</h2>
      <Card currentDeck={currentDeck} loading={loading} />
    </div>
  );
  if (loading) {
    return <p>Study Loading...</p>;
  }
  if (cards.length < 3) {
    return (
      <div>
        <NotEnoughCards cards={cards} />
      </div>
    );
  }
  return <>{renderView}</>;
}

export default Study;
