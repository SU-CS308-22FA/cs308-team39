import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages & components
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/NavBar";
import Create from "./pages/create/Create";
import Merch from "./pages/Merch/Merch";
import UserPage from "./pages/UserPage/UserPage";
import { useAuthContext } from "./hooks/useAuthContext";

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
            <Route path="/shirts">
              <Shirts />
            </Route>
            <Route path="/jackets">
              <Jackets />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
