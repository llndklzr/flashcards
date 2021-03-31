import React from "react";

/** Main header across top of all pages 
 * 
 */

function Header() {
  return (
    <header className="jumbotron bg-primary">
      <div className="container text-white">
        <h1 className="display-4">Flashcard-o-matic</h1>
        <p className="lead">Discover The Flashcard Difference.</p>
      </div>
    </header>
  );
}
export default Header;
