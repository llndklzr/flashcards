import React from "react";

/** a fallback component for bad URLs
 */

function NotFound({ loading }) {
  const renderView = (
    <div className="NotFound">
      <h1>Not Found</h1>
    </div>
  );
  if (loading) {
    return <p>Loading...</p>;
  } else {
    return <>{renderView}</>;
  }
}

export default NotFound;
