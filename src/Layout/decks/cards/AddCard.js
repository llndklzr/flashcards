import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../Button";
import { createCard } from "../../../utils/api"

// /decks/:deckId/cards/new

function AddCard ({currentDeck, setRenderFlag}) {
  const {name, id} = currentDeck;

  const initialCardData = {
    deckId: id,
    front: "",
    back: "",
  };

  const [cardData, setCardData] = useState(initialCardData);

  const handleChange = ({target}) => {
    setCardData({
      ...cardData,
      [target.name]: target.value,
    });
    console.log(cardData)
  };
  
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setRenderFlag(true)
    Promise.resolve(createCard(id, cardData))
      .then(setCardData(initialCardData))
      .catch((console.log)); 
  }

  
  return (
    <div>
      <h2>{name}: Add Card</h2>
      <div className="form-group">
        <label htmlFor="frontText">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          rows="3"
          onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="backText">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          onChange={handleChange}
        />
      </div>
      <Button onClick={() => history.push(`/decks/${id}`)}>Done</Button>
      <Button type="submit" onClick={handleSubmit}>Save</Button>
    </div>
  );
}

export default AddCard;