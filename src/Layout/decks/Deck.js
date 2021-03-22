import React from "react";
import { Switch, useRouteMatch, Route, Link, useParams } from "react-router-dom";
import AddCard from "./cards/AddCard";
import { Button, DeleteButton } from "../Button";
import EditDeck from "./EditDeck";
import CardList from "./CardList";
import NotEnoughCards from "./NotEnoughCards";

// decks/:deckId

function Deck({decks, ...restProps}) {
  const { url } = useRouteMatch();
  const {deckId} = useParams();
  
  const currentDeck = decks.find((deck) => deck.id === Number(deckId))
  const { id, name, description, cards } = currentDeck;
  
  return (
    <div>
      <Switch>
        <Route exact path="/decks/:deckId">
          <h2>{name}</h2>
          <p>{description}</p>
          <Link to={`${url}/edit`}><Button>Edit</Button></Link>
          <Link to={`${url}/study`}><Button>Study</Button></Link>
          <Link to={`${url}/cards/new`}><Button>Add Card</Button></Link>
          <DeleteButton>Delete</DeleteButton>
          {/* TODO: map out all the cards here */}
          <CardList cards={cards} />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route>
          <AddCard currentDeck={currentDeck} {...restProps}/>
        </Route>
      </Switch>
    </div>
  );
}

export default Deck;