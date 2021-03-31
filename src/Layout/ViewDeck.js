import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import { Button, DeleteButton } from "./Button";
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

function ViewDeck({ currentDeck, setLoading, loading }) {
  const { name, description, cards, id } = currentDeck;
  const { url } = useRouteMatch();
  const history = useHistory();
  async function deleteHandler() {
    const abortController = new AbortController();
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      try{
        await deleteDeck(id, abortController.signal);
        setLoading(true);
        history.push("/");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("ViewDeck Delete Aborted")
        } else {
          console.log(error) ;
        }
      }
      return () => abortController.abort();
    }
  }
  const renderView = (
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
      <DeleteButton onClick={deleteHandler}>Delete</DeleteButton>
      <CardList cards={cards} setLoading={setLoading} loading={loading} />
    </div>
  );
  if (loading) {
    return <p>Loading View Deck...</p>;
  } else {
    return <>{renderView}</>;
  }
}

export default ViewDeck;
