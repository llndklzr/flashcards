import React from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { Button, DeleteButton } from "../../../Button";
import CardList from "./CardList";

// decks/:deckId

/** Component to view a deck. Lays out all cards and gives navigation
 *  to EditDeck, Study, AddCard, EditCard. Can delete decks or cards from here.
 *
 *  @param {object} currentDeck
 *  the current deck corresponding to :deckId in the url
 *  @param {function} setLoading
 *  a function to update decks and trigger a re-render
 */

function ViewDeck({ currentDeck, setLoading }) {
  const { name, description, cards } = currentDeck;
  const { url } = useRouteMatch();
  return (
    <div>
      <h2>{name}</h2>
      <h4>{description}</h4>
      <Link to={`${url}/edit`}>
        <Button>Edit</Button>
      </Link>
      <Link to={`${url}/study`}>
        <Button>Study</Button>
      </Link>
      <Link to={`${url}/cards/new`}>
        <Button>Add Cards</Button>
      </Link>
      <DeleteButton>Delete</DeleteButton>
      <CardList cards={cards} setLoading={setLoading} />
    </div>
  );
}

export default ViewDeck;
