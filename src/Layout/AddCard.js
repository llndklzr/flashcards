import React from "react";
import {  useParams } from "react-router-dom";
import CardForm from "./CardForm";

// /decks/:deckId/cards/new

/** Create a new card and send it to the API
 *
 *  @param {object} currentDeck
 *  the deck which corresponds with :deckId in the url
 *  @param {function} setLoading
 *  set true to trigger a rerender
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */

function AddCard({ currentDeck, setLoading, loading }) {
  const { deckId } = useParams();
  const { name } = currentDeck;
  const initialAddCardData = {
    deckId,
    front: "",
    back: "",
  };
  
  const renderView = (
    <div>
      <h2>Add Card</h2>
      <h3>Deck: {name}</h3>
      <CardForm initialCardData={initialAddCardData} setLoading={setLoading} />
    </div>
  );
  if (loading) {
    return <p>Add Card Loading...</p>;
  } else {
    return <>{renderView}</>;
  }
}

export default AddCard;
