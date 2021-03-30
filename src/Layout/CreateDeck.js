import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import { Button } from "./Button";

// /decks/new

/** Create a new deck and send it to the API
 *
 *  @param {function} setLoading
 *  set true to trigger updating decks and a rerender
 */

function CreateDeck({ setLoading }) {
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const { id } = await createDeck(formData);
    setLoading(true);
    history.push(`/decks/${id}`);
  }

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label className="col-form-label" htmlFor="deckName">
          Name
        </label>
        <input
          id="deckName"
          type="text"
          name="name"
          onChange={handleChange}
          className="form-control"
          value={formData.name}
          placeholder="Deck Name"
        />
        <label htmlFor="deckDescription">Description</label>
        <textarea
          id="deckDescription"
          name="description"
          onChange={handleChange}
          className="form-control"
          value={formData.description}
          rows="3"
          placeholder="Brief description of the deck"
        />
        <Button onClick={() => history.push("/")}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CreateDeck;
