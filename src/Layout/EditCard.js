import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { useHistory, useParams } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

/** A component to modify the content of a particular card via an API
 *
 *  @param {function} setLoading
 *  set true to update decks and trigger a rerender
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */

function EditCard({ setLoading, loading }) {
  const { cardId, deckId } = useParams();
  const [editCardData, setEditCardData] = useState({});
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadEditCardData() {
      try {
        const currentCard = await readCard(cardId, abortController.signal);
        const { id, front, back, deckId } = currentCard;
        const initialEditCardData = {
          id,
          front,
          back,
          deckId,
        };
        setEditCardData(initialEditCardData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadEditCardData Aborted");
        } else {
          throw error;
        }
      }
    }
    loadEditCardData();
    return () => abortController.abort();
  }, [cardId]);

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
    return () => abortController.abort();
  }
  const renderView = (
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
  if (loading) {
    return <p>Edit Card Loading...</p>;
  } else {
    return <>{renderView}</>;
  }
}

export default EditCard;
