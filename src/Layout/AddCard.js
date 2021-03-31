import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "./Button";
import { createCard } from "../utils/api/index";

// /decks/:deckId/cards/new

/** Create a new card and send it to the API
 *
 *  @param {object} currentDeck
 *  the deck which corresponds with :deckId in the url
 *  @param {function} setLoading
 *  set true to trigger a rerender
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */

function AddCard({ currentDeck, setLoading, loading }) {
  const { deckId } = useParams();
  const [addCardData, setAddCardData] = useState({});
  const { name, id } = currentDeck;
  const initialAddCardData = {
    deckId,
    front: "",
    back: "",
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function loadAddCardData() {
      try {
        setAddCardData(initialAddCardData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadAddCardData Aborted");
        } else {
          throw error;
        }
      }
    }
    loadAddCardData();
    return () => abortController.abort;
  }, [deckId]);

  const handleChange = ({ target }) => {
    setAddCardData({
      ...addCardData,
      [target.name]: target.value,
    });
  };

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createCard(id, addCardData, abortController.signal);
      setAddCardData(initialAddCardData);
      setLoading(true);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("AddCard handleSubmit Aborted");
      } else {
        throw error;
      }
    }
  }

  const renderView = (
    <div>
      <h2>Add Card</h2>
      <h3>Deck: {name}</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <label htmlFor="frontText">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          rows="3"
          onChange={handleChange}
          value={addCardData.front}
        />
        <label htmlFor="backText">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          onChange={handleChange}
          value={addCardData.back}
        />
        <Button
          onClick={() => {
            setLoading(true);
            return history.push(`/decks/${id}`);
          }}
        >
          Done
        </Button>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
  if (loading) {
    return <p>Add Card Loading...</p>;
  } else {
    return <>{renderView}</>;
  }
}

export default AddCard;
