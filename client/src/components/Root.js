import React from "react";
import { RecoilRoot } from "recoil";
import Home from "./Home";
import Room from "./Room";
import PathNotMatched from "./PathNotMatched";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/room/:id">
            <Room />
          </Route>
          <Route path="*">
            <PathNotMatched />
          </Route>
        </Switch>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
