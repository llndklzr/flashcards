import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/** A component containing links back to pages in the path to current page
 *
 *  @param {array} crumbs
 *  an array of the pages to be in the breadcrumbed, ["foo", "bar", "etc"]
 *  @param {object} currentDeck
 *  stately object containing the current deck, {id, name, description}
 *  should only exist in routes including :deckId and :cardId
 */

const Breadcrumb = ({ crumbs, currentDeck }) => {
  const { deckId, cardId } = useParams();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const routes = [
    { path: "/", name: "Home", Component: "Home" },
    { path: "/decks/:deckId", name: "Deck", Component: "Deck" },
    { path: "/decks/new", name: "Create Deck", Component: "CreateDeck" },
    { path: "/decks/:deckId/study", name: "Study", Component: "Study" },
    { path: "/decks/:deckId/edit", name: "Edit Deck", Component: "EditDeck" },
    {
      path: "/decks/:deckId/cards/new",
      name: "Add Card",
      Component: "AddCard",
    },
    {
      path: "/decks/:deckId/cards/:cardId/edit",
      name: "Edit Card",
      Component: "EditCard",
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    async function loadBreadcrumbs() {
      try {
        const crumbArray = crumbs.map((crumb, key) => {
          const found = routes.find((route) => {
            return route.name === crumb;
          });
          // special cases to use names based on the specific deck or card
          if (found.path.includes(":deckId")) {
            const replacement = found.path.replace(":deckId", deckId);
            found.path = replacement;
          }
          if (found.path.includes(":cardId")) {
            const replacement = found.path.replace(":cardId", cardId);
            found.path = replacement;
          }
          if (found.name === "Deck") {
            found.name = currentDeck.name;
          }
          if (found.name === "Edit Card") {
            found.name = `Edit Card ${cardId}`;
          }
          // just a name for the current page, a link for everything else
          if (crumbs.indexOf(crumb) === crumbs.length - 1) {
            return (
              <li key={key} className="breadcrumb-item active">
                {found.name}
              </li>
            );
          } else {
            return (
              <li key={key} className="breadcrumb-item">
                <Link to={found.path}>{found.name}</Link>
              </li>
            );
          }
        });
        setBreadcrumbs(crumbArray);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadBreadcrumbs Aborted")
        } else {
          throw error;
        }
      }
    }
    loadBreadcrumbs();
    return () => abortController.abort();
  }, [cardId, crumbs]);
  return <ol className="breadcrumb">{breadcrumbs}</ol>;
};

export default Breadcrumb;
