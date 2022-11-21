import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages & components
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/NavigationBar";
import Create from "./pages/create/Create";
import Merch from "./pages/merch/Merch";
import Shirts from "./pages/Products/Shirts";
import Jackets from "./pages/Products/Jackets";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/merch/:id">
            <Merch />
          </Route>
          <Route path="/shirts">
            <Shirts />
          </Route>
          <Route path="/jackets">
            <Jackets />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
