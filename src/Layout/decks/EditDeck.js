import React from "react";
import { Button } from "../Button";

// /decks/:deckId/edit

function EditDeck() {
  return (
    <div>
      <h2>Edit Deck</h2>
      <div className="form-group">
        <label className="col-form-label" for="deckName">Name</label>
        <input type="text" className="form-control" placeholder="Deck Name" id="deckName" />
      </div>
      <div className="form-group">
        <label for="deckDescription">Description</label>
        <textarea className="form-control" placeholder="Brief description of the deck" id="deckDescription" rows="3"></textarea>
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default EditDeck;