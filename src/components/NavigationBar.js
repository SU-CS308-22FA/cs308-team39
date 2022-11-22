import React from "react";
import "./NavigationBar.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Searchbar from "./Searchbar";

{/*
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
})); */}

export default function NavBar() {
  //different buttons if logged in
  const { logout } = useLogout(); //, isPending, error
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <div className="UpperBar">
        <img
          className="Logo"
          alt="Site Logo"
          src={process.env.PUBLIC_URL + "/logo-social.png"}
        />
        <Searchbar className="SearchBar" component="form" sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            marginTop: 1,
            
          }}/>
        {/* 
        <Paper
          className="SearchBar"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            marginTop: 1,
            width: 400,
            height: 50,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        */}
        {!user && (
          <>
            <div>
              <Link to="/login">Login</Link>

              <Link to="/signup">Signup</Link>
            </div>
          </>
        )}
        {user && (
          <>
            <Link to={`/UserPage/${user.displayName}`}>
              Welcome, {user.displayName}
            </Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
      </div>
      <div className="LowerBar">
        <Link to="/">Home</Link>

        <div className="subnav">
          <button className="subnavbtn">
            Teams <i className="fa fa-caret-down"></i>
          </button>
          <div className="subnav-content">
            <Link to="/galatsaray">Galatsaray</Link>
            <Link to="/trabzonspor">Trabzonspor</Link>
            <Link to="/besiktas">Besiktas</Link>
            <Link to="/fenerbahce">Fenerbahce</Link>
            <Link to="/umraniyespor">Umraniyespor</Link>
            <Link to="/konyaspor">Konyaspor</Link>
          </div>
        </div>
        <div className="subnav">
          <button className="subnavbtn">
            Clothing <i className="fa fa-caret-down"></i>
          </button>
          <div className="subnav-content">
            <Link to="/jackets">Jackets</Link>
            <Link to="/shirts">Shirts</Link>
            <Link to="/shorts">Shorts</Link>
            <Link to="/pants">Pants</Link>
            <Link to="/shoes">Shoes</Link>
            <Link to="/socks">Socks</Link>
            <Link to="/hats">Hat</Link>
            <Link to="/glasses">Glasses</Link>
          </div>
        </div>
        <div className="subnav">
          <button className="subnavbtn">
            Accessories <i className="fa fa-caret-down"></i>
          </button>
          <div className="subnav-content">
            <Link to="/bag">Bags</Link>
            <Link to="/flag">Flags</Link>
            <Link to="/keychain">Keychains</Link>
            <Link to="/football">Footballs</Link>
          </div>
        </div>
        <Link to="/create">Add Product</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
}
