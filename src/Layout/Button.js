import React from "react";

export const Button = ({ children, onClick, type}) => <button
  type={type ? {type} : "button"}
  className="btn btn-primary mb-4 mx-1"
  onClick={onClick}>
    {children}
  </button>;

export const DeleteButton = ({ children, onClick, type}) => <button
  type={type ? {type} : "button"}
  className="btn btn-danger mb-4 mx-1"
  onClick={onClick}>
    {children}
  </button>;