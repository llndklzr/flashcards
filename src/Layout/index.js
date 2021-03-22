import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";

import Home from "./Home";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">    
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
