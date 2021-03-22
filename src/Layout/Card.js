import React, { useState } from "react";
import { Button } from "./Button";

function Card({currentDeck}) {

  const {cards} = currentDeck 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [front, setFront] = useState(true);

  const nextButtonHandler = () => {
    if (currentIndex < (cards.length - 1)) { 
      setCurrentIndex(currentIndex + 1);
      setFront(true);
    }
  };

  const flipButtonHandler = () => {
    setFront(!front);
  };

  return (
  <div className="card border-primary mb-3">
    <div className="card-body">
      {/* TODO: title is card # of # */}
      <h4 className="card-title">Card {currentIndex + 1} of {cards.length}</h4>
      {/* TODO: put card content here */}
      <p className="card-text">{front ? cards[currentIndex].front : cards[currentIndex].back}</p>
      {/* TODO: implement flip button */}
      <Button onClick={flipButtonHandler}>Flip</Button>
      {/* TODO: routing to only show Next once card is flipped */}
      {!front ? <Button onClick={nextButtonHandler}>Next</Button> : null}
    </div>  
  </div>
  );
}

export default Card;