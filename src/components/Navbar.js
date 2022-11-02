import React from "react";
import "./NavBar.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
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
    <div className="Nav">
      <div className="Heading">
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
            width: 400,
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

      <Grid className="MenuBar" justifyContent="Center" container spacing={0}>
        <Grid item xs={3}>
          <Link to="/">
            <button className="Home_Button">Home</button>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <button className="Teams_DropDown">Teams</button>
        </Grid>
        <Grid item xs={3}>
          <button className="Category_DropDown">Categories</button>
        </Grid>
        <Grid item xs={3}>
          <button className="Contact_Button">Contact Us</button>
        </Grid>
      </Grid>
    </div>
  );
}

export default NavigationBar;
