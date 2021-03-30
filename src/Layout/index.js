import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";
import Header from "./Header";
import Deck from "./Deck";
import NotFound from "./NotFound";
import Breadcrumb from "./Breadcrumb";
import Home from "./Home";
import CreateDeck from "./CreateDeck";


function Layout() {
  const [decks, setDecks] = useState(null);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    // Promise.resolve(listDecks(abortController.signal))
    //   .then((result) => setDecks(result))
    //   .catch(setError)
    //   .then(setLoading(false));

    async function loadDecks() {
      try {
        const deckContent = await listDecks(abortController.signal);
        setDecks(deckContent);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadDecks Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
    setLoading(false);
    return () => abortController.abort();
  }, [loading]);

  //const renderLoading = () => <div>Loading...</div>;
  //const renderError = () => <div>Got an error.</div>;
  const renderView = (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setLoading={setLoading} />
          </Route>
          <Route exact path="/decks/new">
            <Breadcrumb crumbs={["Home", "Create Deck"]} />
            <CreateDeck decks={decks} setLoading={setLoading} />
          </Route>
          <Route path="/decks/:deckId">
            {/* nested routing continues in Deck component */}
            <Deck decks={decks} setLoading={setLoading} setError={setError} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );

  if (!decks) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {/* 
      {error && renderError()}
      {loading && renderLoading()}
      */}
      {renderView}
    </div>
  );
}

export default Layout;
