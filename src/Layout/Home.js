import React from "react";
import { Link } from "react-router-dom";

import DeckThumbnails from "./DeckThumbnails";
import { Button } from "./Button";

function Home({decks, setLoading}) {
  return (
    <div>
      <Link to="/decks/new">
        <Button>Create Deck</Button>
      </Link>
      <DeckThumbnails decks={decks} setLoading={setLoading} />
    </div>
  );
}

export default Home;
