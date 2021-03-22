import React from "react";
import { Button, DeleteButton } from "../Button";

function CardList({cards}) {
  const cardCards = cards.map((card) => <div>
    <div className="card border-primary mb-3">
      <div className="card-body">
        <h4 className="card-text text-danger">Front</h4>
        <p className="card-text">{card.front}</p>
        <br />
        <h4 className="card-text text-danger">Back</h4>
        <p className="card-text">{card.back}</p>
      </div>
    </div>
    <Button>Edit</Button>
    <DeleteButton>Delete</DeleteButton>
    <br />
    <br />
  </div>

  )
  return cardCards;
}

export default CardList;