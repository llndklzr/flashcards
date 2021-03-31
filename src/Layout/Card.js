import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "./Button";

/** For use inside Study component. Allows users to read both sides
 *  of flashcards and advance to next flashcard. Gives option to start
 *  over after reading last flashcard.
 *
 *  @param {object} currentDeck
 *  the current deck corresponding with :deckId in url, {name, description, id}
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */

function Card({ currentDeck, loading }) {
  const { cards } = currentDeck;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [front, setFront] = useState(true);
  const history = useHistory();

  const nextButtonHandler = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFront(true);
    } else {
      if (
        window.confirm(
          "Restart cards?\n\nClick 'Cancel' to return to the home page"
        )
      ) {
        setCurrentIndex(0);
        setFront(true);
      } else {
        history.push("/");
      }
    }
  };

  const flipButtonHandler = () => {
    setFront(!front);
  };

  const renderView = (
    <div className="card border-primary mb-3">
      <div className="card-body">
        {/* TODO: title is card # of # */}
        <h4 className="card-title">
          Card {currentIndex + 1} of {cards.length}
        </h4>
        {/* TODO: put card content here */}
        <p className="card-text">
          {front ? cards[currentIndex].front : cards[currentIndex].back}
        </p>
        {/* TODO: implement flip button */}
        <Button onClick={flipButtonHandler}>Flip</Button>
        {/* TODO: routing to only show Next once card is flipped */}
        {!front ? <Button onClick={nextButtonHandler}>Next</Button> : null}
      </div>
    </div>
  );
  if (loading) {
    return <p>Loading Card...</p>;
  } else {
    return <>{renderView}</>;
  }
}

export default Card;
