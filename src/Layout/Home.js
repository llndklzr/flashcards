import React, { useEffect, useState } from "react";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import { listCards, listDecks } from "../utils/api";
import { Button } from "./Button";
import CreateDeck from "./decks/CreateDeck";
import Deck from "./decks/Deck";
import DeckThumbnails from "./DeckThumbnails";
import Study from "./decks/Study";




function Home() {
  const [decks, setDecks] = useState(null);
  const [error, setError] = useState(undefined);
  const [currentDeck, setCurrentDeck] = useState({});
  const [nextCardId, setNextCardId] = useState(0);
  const [renderFlag, setRenderFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setRenderFlag(false)
    Promise.resolve(listDecks(abortController.signal))
      .then((result) => setDecks(result))
      .catch(setError);

      setLoading(false);
      return () => abortController.abort();
  }, [renderFlag, setLoading]);


  console.log(decks)
  
  const renderLoading = () => <div>Loading...</div>;
  const renderError = () => <div>Got an error.</div>;
  const renderView = (
    <div>
      <Switch>
        <Route exact path="/">
          {/* TODO: Implement the screen starting here */}
          {/* create deck button takes user to CreateDeck */}
          <Link to="/decks/new"><Button>Create Deck</Button></Link>
          {/* TODO: display existing decks: deck name, number of cards */}
          {/* TODO: buttons: study -> Study, edit-> EditDeck, delete w/ warning */}
          <DeckThumbnails
            decks={decks}
            setRenderFlag={setRenderFlag}
          />
        </Route>
        <Route path="/decks/new">
          <CreateDeck
            decks={decks}
            setRenderFlag={setRenderFlag}
          />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study decks={decks} />
        </Route>
        <Route path="/decks/:deckId">
          <Deck 
            decks={decks}
            setRenderFlag={setRenderFlag}
          />
        </Route>
      </Switch>
    </div>
  );

  return (
    <>
      {error && renderError()}
      {loading && renderLoading()}
      {decks && renderView}
    </>
  );
}

export default Home;