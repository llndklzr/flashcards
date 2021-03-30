import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { useHistory, useParams } from "react-router-dom";
import { updateCard } from "../utils/api";

/** A component to modify the content of a particular card via an API
 *
 *  @param {object} currentDeck
 *  the deck pertaining to :deckId in the url
 *  @param {function} setLoading
 *  set true to update decks and trigger a rerender
 */

function EditCard({ currentDeck, setLoading }) {
  const { cardId } = useParams();
  const [editCardData, setEditCardData] = useState({});
  const history = useHistory();
  const currentCard = currentDeck.cards.find(
    ({ id }) => Number(cardId) === Number(id)
  );
  const { id, front, back, deckId } = currentCard;
  const initialEditCardData = {
    id,
    front,
    back,
    deckId,
  };

  useEffect(() => {
    setEditCardData(initialEditCardData);
  }, []);

  const handleChange = ({ target }) => {
    setEditCardData({
      ...editCardData,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    await updateCard(editCardData, abortController.signal);
    history.push(`/decks/${deckId}`);
    setLoading(true);
    return abortController.abort();
  }
  return (
    <div>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label className="col-form-label" htmlFor="frontText">
          Front
        </label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          onChange={handleChange}
          value={editCardData.front}
          rows="3"
        />
        <br />
        <label htmlFor="backText">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          onChange={handleChange}
          value={editCardData.back}
          rows="3"
        />
        <Button onClick={() => history.push(`/decks/${deckId}`)}>Done</Button>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}

export default EditCard;
