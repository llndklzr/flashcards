import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import CreateDeck from "./CreateDeck/CreateDeck";
import Deck from "./Deck/Deck";
import DeckThumbnails from "./DeckThumbnails";
import Breadcrumb from "../Breadcrumb";
import NotFound from "../NotFound";
import { Button } from "../Button";
import { listDecks } from "../../utils/api";

function Home() {
  const [decks, setDecks] = useState(null);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    Promise.resolve(listDecks(abortController.signal))
      .then((result) => setDecks(result))
      .catch(setError)
      .then(setLoading(false));
    return () => abortController.abort();
  }, [loading]);

  const renderLoading = () => <div>Loading...</div>;
  const renderError = () => <div>Got an error.</div>;
  const renderView = (
    <div>
      <Switch>
        <Route exact path="/">
          <Link to="/decks/new">
            <Button>Create Deck</Button>
          </Link>
          <DeckThumbnails decks={decks} setLoading={setLoading} />
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
  );

  return (
    <div>
      {error && renderError()}
      {loading && renderLoading()}
      {decks && renderView}
    </div>
  );
}

export default Home;
