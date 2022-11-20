import React from "react";
import "./NavigationBar.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function NavigationBar() {
  return (
    <div class="navbar">
      <div class="UpperBar">
        <img
          className="Logo"
          alt="Site Logo"
          src={process.env.PUBLIC_URL + "/logo-social.png"}
        />
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
        <li>
          <Link to="/login">Login</Link>
          <br></br>
        </li>

        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </div>
      <div class="LowerBar">
        <Link to="/">Home</Link>

        <div class="subnav">
          <button class="subnavbtn">
            Teams <i class="fa fa-caret-down"></i>
          </button>
          <div class="subnav-content">
            <Link to="/galatsaray">Galatsaray</Link>
            <Link to="/trabzonspor">Trabzonspor</Link>
            <Link to="/besiktas">Besiktas</Link>
            <Link to="/fenerbahce">Fenerbahce</Link>
            <Link to="/umraniyespor">Umraniyespor</Link>
            <Link to="/konyaspor">Konyaspor</Link>
          </div>
        </div>
        <div class="subnav">
          <button class="subnavbtn">
            Clothing <i class="fa fa-caret-down"></i>
          </button>
          <div class="subnav-content">
            <Link to="/jacket">Jackets</Link>
            <Link to="/shirt">Shirts</Link>
            <Link to="/short">Shorts</Link>
            <Link to="/pants">Pants</Link>
            <Link to="/shoes">Shoes</Link>
            <Link to="/socks">Socks</Link>
            <Link to="/hat">Hat</Link>
            <Link to="/glasses">Glasses</Link>
          </div>
        </div>
        <div class="subnav">
          <button class="subnavbtn">
            Accessories <i class="fa fa-caret-down"></i>
          </button>
          <div class="subnav-content">
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

export default NavigationBar;
