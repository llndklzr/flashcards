import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Button } from "./Button";
import { updateDeck } from "../utils/api/index";

// /decks/:deckId/edit

/** updates a deck's name and description via an API
 *
 *  @param {object} currentDeck
 *  the current deck, corresponding to :deckId in the url, {name, description, id}
 *  @param {function} setLoading
 *  set true to update decks and trigger a re-render
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */

function EditDeck({ currentDeck, setLoading, loading }) {
  const { deckId } = useParams();
  const [editDeckData, setEditDeckData] = useState({
    name: "test",
    description: "alsoTest",
    id: deckId,
  });
  const { name, description } = currentDeck;
  const history = useHistory();
  const initialEditDeckData = {
    name,
    description,
    id: deckId,
  };

  useEffect(() => {
    setEditDeckData(initialEditDeckData);
  }, []);

  const handleChange = ({ target }) => {
    setEditDeckData({
      ...editDeckData,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    await updateDeck(editDeckData, abortController.signal);
    history.push(`/decks/${deckId}`);
    setLoading(true);
    return () => abortController.abort();
  }

  const renderView = (
    <div>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label className="col-form-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={editDeckData.name}
          id="name"
          name="name"
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          onChange={handleChange}
          value={editDeckData.description}
          id="description"
          name="description"
          rows="3"
        />
        <Link to={`/decks/${deckId}`}>
          <Button>Cancel</Button>
        </Link>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
  if (loading) {
    return <p>Edit Deck Loading...</p>;
  } else {
    return <>{renderView}</>;
  }
}

export default EditDeck;
