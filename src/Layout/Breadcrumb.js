import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb() {
  return (
    <div>
      <ol className="breadcrumb">
        {/* TODO: implement this, possibly from URL */}
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><a href="#">Deck Name</a></li>
        <li className="breadcrumb-item active">Study</li>
      </ol>
    </div>
  );
}

export default Breadcrumb;