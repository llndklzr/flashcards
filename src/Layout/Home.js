import React from "react";
import { Link } from "react-router-dom";

import DeckThumbnails from "./DeckThumbnails";
import { Button } from "./Button";

function Home({ decks, setLoading, loading }) {
  const renderView = (
    <div>
      <Link to="/decks/new">
        <Button>Create Deck</Button>
      </Link>
      <DeckThumbnails decks={decks} setLoading={setLoading} loading={loading} />
    </div>
  );

  if (loading) {
    return <p>Loading Home...</p>;
  } else {
    return <div>{renderView}</div>;
  }
}

export default Home;
