import React from "react";
import "./NavigationBar.css";
/*
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
*/
import { Link } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Searchbar from "./Searchbar";
//import { projectFirestore } from "../firebase/config";
import { GiShoppingBag } from "react-icons/gi";

/*
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
})); */
/*let team
try {
  const { user } = useAuthContext();
  const t_user = projectFirestore.collection("users").doc(user.uid).get()
  const type = t_user.data().type
  team = type != "customer"
  console.log(team)
  
} catch (error) {
  
} */
export default function NavBar() {
  const { user } = useAuthContext();

  //different buttons if logged in
  const { logout } = useLogout(); //, isPending, error

  return (
    <div className="navbar">
      <div className="UpperBar">
        <img
          className="Logo"
          alt="Site Logo"
          src={process.env.PUBLIC_URL + "/logo-social.png"}
        />
        <Searchbar className="SearchBar" />
        <div className="LoginLogout">
          {!user && (
            <div>
              <Link to="/login">Login</Link>

              <Link to="/signup">Signup</Link>
            </div>
          )}
          {user && (
            <>
              <div className="subnav">
                <button className="subnavbtn">
                  Welcome, {user.displayName}
                  <div className="subUsernav">
                    <Link to={"/UserPage/" + user.displayName}>
                      User Information
                    </Link>
                    <Link to={"/" + user.displayName + "/Addresses"}>
                      Addresses
                    </Link>
                    <Link to={"/" + user.displayName + "/Orders"}>Orders</Link>
                    <Link to={"/" + user.displayName + "/Favorites"}>
                      Favorites
                    </Link>
                  </div>
                </button>
              </div>{" "}
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="LowerBar">
        <Link to="/">Home</Link>

        <div className="subnav">
          <button className="subnavbtn">
            Teams <i className="fa fa-caret-down"></i>
          </button>
          <div className="subnav-content">
            <Link to="/teams/galatasaray">Galatasaray</Link>
            <Link to="/teams/trabzonspor">Trabzonspor</Link>
            <Link to="/teams/besiktas">Besiktas</Link>
            <Link to="/teams/fenerbahce">Fenerbahce</Link>
            <Link to="/teams/umraniyespor">Ümraniyespor</Link>
            <Link to="/teams/konyaspor">Konyaspor</Link>
            <Link to="/teams/karsiyaka">Karşıyaka</Link>
          </div>
        </div>
        <div className="subnav">
          <button className="subnavbtn">
            Clothing <i className="fa fa-caret-down"></i>
          </button>
          <div className="subnav-content">
            <Link to="/categories/jacket">Jackets</Link>
            <Link to="/categories/shirt">Shirts</Link>
            <Link to="/categories/shorts">Shorts</Link>
            <Link to="/categories/pants">Pants</Link>
            <Link to="/categories/shoes">Shoes</Link>
            <Link to="/categories/socks">Socks</Link>
            <Link to="/categories/hat">Hat</Link>
            <Link to="/categories/glasses">Glasses</Link>
          </div>
        </div>
        <div className="subnav">
          <button className="subnavbtn">
            Accessories <i className="fa fa-caret-down"></i>
          </button>
          <div className="subnav-content">
            <Link to="/categories/bag">Bags</Link>
            <Link to="/categories/flag">Flags</Link>
            <Link to="/categories/keychain">Keychains</Link>
            <Link to="/categories/football">Footballs</Link>
          </div>
        </div>
        <Link to="/create">Add Product</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
        {user && (
          <Link to="/cart">
            <GiShoppingBag size={24} />
          </Link>
        )}
      </div>
    </div>
  );
}
