import React, { useEffect, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import Breadcrumb from "./Breadcrumb";
import EditCard from "./EditCard";
import ViewDeck from "./ViewDeck";
import Study from "./Study";
import NotFound from "./NotFound";

/** A component for all routes containing :deckId.
 * 
 *  @param {array} decks
 *  the list of decks, {id, name, description}
 *  @param {function} setLoading
 *  set true to trigger updating decks and a rerender
 *  @param {function} setError
 *  error handler
 */

function Deck({ decks, setLoading, setError }) {
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    const deckToSetCurrent = decks.find((deck) => deck.id === Number(deckId));

    Promise.resolve(deckToSetCurrent)
      .then((result) => setCurrentDeck(result))
      .catch(setError)
      .then(setLoading(false));

    return () => abortController.abort();
  }, [deckId, decks, setError, setLoading]);

  if (currentDeck) {
    return (
      <div>
        <Switch>
          <Route exact path="/decks/:deckId">
            <Breadcrumb crumbs={["Home", "Deck"]} currentDeck={currentDeck} />
            <ViewDeck currentDeck={currentDeck} setLoading={setLoading} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <Breadcrumb
              crumbs={["Home", "Deck", "Edit Deck"]}
              currentDeck={currentDeck}
            /> 
            <EditDeck
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
              setLoading={setLoading}
            />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <Breadcrumb
              crumbs={["Home", "Deck", "Add Card"]}
              currentDeck={currentDeck}
            />
            <AddCard decks={decks} setLoading={setLoading} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <Breadcrumb
              crumbs={["Home", "Deck", "Edit Card"]}
              currentDeck={currentDeck}
            />
            <EditCard currentDeck={currentDeck} setLoading={setLoading} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Breadcrumb
              crumbs={["Home", "Deck", "Study"]}
              currentDeck={currentDeck}
            />
            <Study currentDeck={currentDeck} />
          </Route>
        </Switch>
      </div>
    );
  } else {
    return (
      <div>
        <NotFound />
      </div>
    );
  }
}

export default Deck;
