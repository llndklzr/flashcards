import React from "react";
import { Link } from "react-router-dom";
import { Button, DeleteButton } from "./Button";
import { deleteDeck } from "../utils/api";

function DeckThumbnails({decks, setRenderFlag}) {
  function deleteHandler() {
    deleteDeck(decks)
  }
  
  const deleteButtonClass = `"btn btn-danger"`

  return (
    decks.map(({id, name, description, cards}) => {
      return (
        <div> 
          <div className="card">
            <div className="card-body">
              {/* TODO: deck title here */}
              <h4 className="card-title text-danger">{name}</h4>
              {/* TODO: number of cards here */}
              <h6 className="card-subtitle mb-2 text-muted">{cards.length} cards</h6>
              <p className="card-text">{description}</p>
              <br />
              {/* TODO: onClick to go to Study */}
              <Link to={`/decks/${id}/study`}><Button>Study</Button></Link>
              {/* TODO: onClick to go to DeckView */}
              <Link to={`/decks/${id}`}><Button>View</Button></Link>
              {/* TODO: modal w/ "OK" or "Cancel" */}
              {/* TODO: onClick delete */}
              <DeleteButton
                onClick={() => {
                  deleteDeck(id);
                  setRenderFlag(true);
                }}
              >Delete</DeleteButton>
            </div>
          </div>
          <br />
        </div>
      );
    })
  );
}

export default DeckThumbnails;