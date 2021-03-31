import React from "react";

export const Button = ({ children, onClick, type }) => (
  <button
    type={type ? { type } : "button"}
    className="btn btn-primary mb-3 mr-2 mt-2"
    onClick={onClick}
  >
    {children}
  </button>
);

export const DeleteButton = ({ children, onClick, type, id = null }) => (
  <button
    type={type ? { type } : "button"}
    className="btn btn-danger mb-3 mr-2 mt-2"
    id={id}
    onClick={onClick}
  >
    {children}
  </button>
);
