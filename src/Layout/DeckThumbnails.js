import React from "react";
import { Link } from "react-router-dom";
import { Button, DeleteButton } from "./Button";
import { deleteDeck } from "../utils/api/index";

/** displays each deck with buttons to Study, View, and Delete
 *   @param {array} decks
 *   the list of decks, {id, name, description}
 *   @param {function} setLoading
 *   set true to trigger updating decks and a rerender
 */
function DeckThumbnails({ decks, setLoading }) {
  async function deleteHandler(id) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(id);
      setLoading(true);
    }
  }

  return decks.map(({ id, name, description, cards }) => {
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
          <DeleteButton
            onClick={() => {
              deleteHandler(id);
            }}
          >
            Delete
          </DeleteButton>
        </div>
      </div>
    );
  });
}

export default DeckThumbnails;
