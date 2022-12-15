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
    let termlen = term.length();
    if (termlen < 7) {
      let shirtcheck = term.includes(shi);
      if (shirtcheck == false) {
        let shirtcheck = term.includes(hir);
        if (shirtcheck == false) {
          let shirtcheck = term.includes(irt);
          if (shirtcheck == false) {
            let shirtcheck = term.includes(sht);
            if (shirtcheck == false) {
              let shirtcheck = term.includes(srt);
              if (shirtcheck == false) {
                let shirtcheck = term.includes(vest);
                if (shirtcheck == false) {
                  let shirtcheck = term.includes(jersey);
                }
              }
            }
          }
        }
      }
      if (shirtcheck == true) {
        setTerm(shirt);
      }
    }
    if (termlen > 4) {
      let jackcheck = term.includes(jack);
      if (jackcheck == false) {
        let jackcheck = term.includes(acke);
        if (jackcheck == false) {
          let jackcheck = term.includes(cket);
          if (jackcheck == false) {
            let jackcheck = term.includes(jcke);
            if (jackcheck == false) {
              let jackcheck = term.includes(aket);
              if (jackcheck == false) {
                let jackcheck = term.includes(hood);
              }
            }
          }
        }
      }
      if (jackcheck == true) {
        setTerm(jacket);
      }
    }

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
