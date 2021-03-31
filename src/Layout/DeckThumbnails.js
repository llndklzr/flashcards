import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, DeleteButton } from "./Button";
import { deleteDeck, listDecks } from "../utils/api/index";

/** displays each deck with buttons to Study, View, and Delete
 *  @param {array} decks
 *  the list of decks, {id, name, description}
 *  @param {function} setLoading
 *  set true to trigger updating decks and a rerender
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */
function DeckThumbnails({ setLoading, loading }) {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    //setLoading(true);
    async function loadDecks() {
      try {
        const deckContent = await listDecks(abortController.signal);
        setDecks(deckContent);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadDecks Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
    setLoading(false);
    return () => abortController.abort();
  }, [loading, setLoading]);

  async function deleteHandler({ target }) {
    const id = target.id;
    const abortController = new AbortController();
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      try{
        await deleteDeck(id, abortController.signal);
        setLoading(true);
        setLoading(false);
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

  const renderView = decks.map(({ id, name, description, cards }) => {
    return (
      <div key={id} className="card mb-3">
        <div className="card-body">
          {/* TODO: deck title here */}
          <h4 className="card-title text-danger">{name}</h4>
          {/* TODO: number of cards here */}
          <h6 className="card-subtitle mb-2 text-muted">
            {cards.length} cards
          </h6>
          <p className="card-text">{description}</p>
          <br />
          {/* TODO: onClick to go to Study */}
          <Link to={`/decks/${id}/study`}>
            <Button>Study</Button>
          </Link>
          {/* TODO: onClick to go to DeckView */}
          <Link to={`/decks/${id}`}>
            <Button>View</Button>
          </Link>
          {/* TODO: modal w/ "OK" or "Cancel" */}
          {/* TODO: onClick delete */}
          <DeleteButton onClick={deleteHandler} id={id}>
            Delete
          </DeleteButton>
        </div>
      </div>
    );
  });
  if (loading) {
    return <p>Loading Deck Thumbnails...</p>;
  } else {
    return <div>{renderView}</div>;
  }
}

export default DeckThumbnails;
