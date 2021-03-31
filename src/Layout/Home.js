import React from "react";
import { Link } from "react-router-dom";

import DeckThumbnails from "./DeckThumbnails";
import { Button } from "./Button";

// /

/** The Home page of the app. Button to Create Deck. 
 *  Shows decks via DeckThumbnails with Study/View/Delete buttons
 * 
 *  @param {function} setLoading
 *  set true to update decks and trigger a re-render
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */

function Home({ setLoading, loading }) {
  const renderView = (
    <div>
      <Link to="/decks/new">
        <Button>Create Deck</Button>
      </Link>
      <DeckThumbnails setLoading={setLoading} loading={loading} />
    </div>
  );

  if (loading) {
    return <p>Loading Home...</p>;
  } else {
    return <div>{renderView}</div>;
  }
}

export default Home;
