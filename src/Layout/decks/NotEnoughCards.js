import React from "react";
import CardList from "./CardList";
import { Button } from "../Button";

function NotEnoughCards({cards}) {
  return <div>
    <h3>Not enough cards.</h3>
    <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
    <Button>Add Cards</Button>
  </div>;
}

export default NotEnoughCards;