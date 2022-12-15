import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages & components
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/NavigationBar";
import Create from "./pages/create/Create";
import Merch from "./pages/Merch/Merch";
import Shirts from "./pages/Products/Shirts";
import Jackets from "./pages/Products/Jackets";
import UserPage from "./pages/UserPage/UserPage";
import { useAuthContext } from "./hooks/useAuthContext";
import Search from "./pages/Search/Search";
import Addresses from "./pages/Addresses/AddressCard";
import Category from "./pages/Products/Category";
import Team from "./pages/Products/Team";
import ShoppingCart from "./components/ShoppingCart";
import Orders from "./pages/Orders/Orders";

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
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
            <Route path="/UserPage/:displayName">
              <UserPage />
            </Route>
            <Route path="/:displayName/Addresses">
              <Addresses />
            </Route>
            <Route path="/shirts">
              <Shirts />
            </Route>
            <Route path="/categories/:category">
              <Category />
            </Route>
            <Route path="/teams/:team">
              <Team />
            </Route>
            <Route path="/jackets">
              <Jackets />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/cart">
              <ShoppingCart />
            </Route>
            <Route path="/:displayName/Orders">
              <Orders />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
