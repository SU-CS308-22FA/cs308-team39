import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// styles
import "./NavigationBar.css";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("BUTTON PRESS");
    history.push(`/search?q=${term}`);
  };

  return (
    <>
      <Paper className="SearchBar">
        <form onSubmit={handleSubmit}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
            id="search"
            type="text"
            onChange={(e) => setTerm(e.target.value)}
            required
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </form>
      </Paper>
    </>
  );
}
