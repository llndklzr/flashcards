import React from "react";
import Button from "../../Button";


function EditCard() {
  return (
    <div>
      <h2>Edit Card</h2>
      <div className="form-group">
        <label for="frontText">Front</label>
        <textarea className="form-control" id="frontText" rows="3"></textarea>
      </div>
      <div className="form-group">
        <label for="backText">Back</label>
        <textarea className="form-control" id="backText" rows="3"></textarea>
      </div>
      <Button>Done</Button>
      <Button>Save</Button>
    </div>
  );
}