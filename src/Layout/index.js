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
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
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

  const renderView = (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setLoading={setLoading} loading={loading} />
          </Route>
          <Route path="/decks/new">
            <Breadcrumb crumbs={["Home", "Create Deck"]} loading={loading} />
            <CreateDeck setLoading={setLoading} loading={loading} />
          </Route>
          <Route path="/decks/:deckId">
            {/* nested routing continues in Deck component */}
            <Deck setLoading={setLoading} loading={loading} />
          </Route>
          <Route>
            <NotFound loading={loading} />
          </Route>
        </Switch>
      </div>
    </>
  );

  if (loading) {
    return <p>Layout Loading...</p>;
  }
  return <>{renderView}</>;
}

export default Layout;
