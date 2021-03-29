import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../../Button";
import { createCard } from "../../../../utils/api/index";

// /decks/:deckId/cards/new

/** Create a new card and send it to the API
 *
 *  @param {array} decks
 *  the list of decks, {id, name, description}
 *  @param  {function} setLoading
 *  set true to trigger updating decks and a rerender
 */

function AddCard({ decks, setLoading }) {
  const { deckId } = useParams();
  const { name, id } = decks.find((deck) => Number(deck.id) === Number(deckId));
  const initialCardData = {
    deckId: id,
    front: "",
    back: "",
  };
  const [cardData, setCardData] = useState(initialCardData);

  const handleChange = ({ target }) => {
    setCardData({
      ...cardData,
      [target.name]: target.value,
    });
  };

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    Promise.resolve(createCard(id, cardData))
      .then(setCardData(initialCardData))
      .catch(console.log)
      .then(setLoading(true));
  };

  return (
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
          value={cardData.front}
        />
        <label htmlFor="backText">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          onChange={handleChange}
          value={cardData.back}
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
}

export default AddCard;
