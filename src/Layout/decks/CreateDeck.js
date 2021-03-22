import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";
import { Button } from "../Button";

// /decks/new

function CreateDeck({decks, setRenderFlag}) {
  // TODO: implement creating a deck
  const initialFormData = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(formData)
  };
  
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setRenderFlag(true)
    Promise.resolve(createDeck(formData))
      .then(({id}) => history.push(`/decks/${id}`))
      .catch((console.log)); 
      
    
  }

  return (
    <div>
      <Breadcrumb />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label className="col-form-label" htmlFor="deckName">Name</label>
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
        <Button onClick={()=>history.push("/")}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CreateDeck;