import React, { useEffect, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import Breadcrumb from "./Breadcrumb";
import EditCard from "./EditCard";
import ViewDeck from "./ViewDeck";
import Study from "./Study";
import NotFound from "./NotFound";
import { readDeck } from "../utils/api";

/** A component for all routes containing :deckId.
 *
 *  @param {function} setLoading
 *  set true to trigger updating decks and a rerender
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */

function Deck({ setLoading, loading }) {
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCurrentDeck() {
      try {
        const deckToSetCurrent = await readDeck(deckId, abortController.signal);
        setCurrentDeck(deckToSetCurrent);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadCurrentDeck Aborted");
        } else {
          throw error;
        }
      }
    }
    loadCurrentDeck();
    setLoading(false);
    return () => abortController.abort();
  }, [deckId, loading]);

  if (currentDeck) {
    return (
      <div>
        <Switch>
          <Route exact path="/decks/:deckId">
            <Breadcrumb
              crumbs={["Home", "Deck"]}
              currentDeck={currentDeck}
              loading={loading}
            />
            <ViewDeck
              currentDeck={currentDeck}
              setLoading={setLoading}
              loading={loading}
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <Breadcrumb
              crumbs={["Home", "Deck", "Edit Deck"]}
              currentDeck={currentDeck}
              loading={loading}
            />
            <EditDeck
              currentDeck={currentDeck}
              setLoading={setLoading}
              loading={loading}
            />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <Breadcrumb
              crumbs={["Home", "Deck", "Add Card"]}
              currentDeck={currentDeck}
              loading={loading}
            />
            <AddCard
              currentDeck={currentDeck}
              setLoading={setLoading}
              loading={loading}
            />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <Breadcrumb
              crumbs={["Home", "Deck", "Edit Card"]}
              currentDeck={currentDeck}
              loading={loading}
            />
            <EditCard
              currentDeck={currentDeck}
              setLoading={setLoading}
              loading={loading}
            />
          </Route>
          <Route path="/decks/:deckId/study">
            <Breadcrumb
              crumbs={["Home", "Deck", "Study"]}
              currentDeck={currentDeck}
              loading={loading}
            />
            <Study currentDeck={currentDeck} loading={loading} />
          </Route>
        </Switch>
      </div>
    );
  } else {
    return (
      <div>
        <NotFound loading={loading} />
      </div>
    );
  }
}

export default Deck;
