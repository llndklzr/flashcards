import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import { Button } from "./Button";

// /decks/new

/** Create a new deck entry via API
 *
 *  @param {function} setLoading
 *  set true to trigger updating decks and a rerender
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */

function CreateDeck({ setLoading, loading }) {
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

  const renderView = (
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
  if (loading) {
    return <p>Loading Create Deck...</p>;
  } else {
    return <>{renderView}</>;
  }
}

export default CreateDeck;
