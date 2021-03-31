import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { readCard } from "../utils/api";
import CardForm from "./CardForm";

/** A component to modify the content of a particular card via an API
 *
 *  @param {function} setLoading
 *  set true to update decks and trigger a rerender
 *  @param {boolean} loading
 *  is the page currently in a loading cycle?
 *  prevent renders before data arrives
 */

function EditCard({ setLoading, loading }) {
  const { cardId, deckId } = useParams();
  const initialEditCardData = {};

  useEffect(() => {
    async function loadEditCardData() {
      const abortController = new AbortController();
      try {
        const currentCard = await readCard(cardId, abortController.signal);
        initialEditCardData.id = currentCard.id;
        initialEditCardData.front = currentCard.front;
        initialEditCardData.back = currentCard.back;
        initialEditCardData.deckId = currentCard.deckId;
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadEditCardData Aborted");
        } else {
          throw error;
        }
      }
      return () => abortController.abort();
    }
    loadEditCardData();
  }, [deckId, cardId]);

  const renderView = (
    <div>
      <h2>Edit Card</h2>
      <CardForm initialCardData={initialEditCardData} setLoading={setLoading} />
    </div>
  );
  if (loading) {
    return <p>Edit Card Loading...</p>;
  } else {
    return <>{renderView}</>;
  }
}

export default EditCard;
