import React from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import Card from "../Card";
import NotEnoughCards from "../decks/NotEnoughCards";

// /decks/:deckId/study

function Study({decks}) {
  
  // TODO: deal with race condition here
  const {deckId} = useParams();
  const currentDeck = decks.find((deck) => deck.id === Number(deckId))
  const {name, cards} = currentDeck;
  if (cards.length < 3) {
    return <NotEnoughCards cards={cards}/>
  } else {
  return <div>
    <Breadcrumb />
    {/* TODO: get deck here */}
    <h2>Study: {name}</h2>
    <Card currentDeck={currentDeck}/>
  </div>;
  }
  

}

export default Study;