import React from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.png";
import userLogo from "../assests/user.jpeg";
import "./header.css";
import {Badge} from '@mui/material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
export default function Header() {
  return (
    <>
      <div className="header">
        <div className="searchBox">
          <img
            id="headerSearchIcon"
            src="https://img.icons8.com/color/48/000000/search--v1.png"
          />
          <input type="search" id="searchBar" placeholder="Search books..." />
        </div>
        <Link to="/">
          <div className="headerLogo" style={{ cursor: "pointer" }}>
            <img src={logo} alt="logo" width="30px" />
          </div>
        </Link>
        <div className="headerMenu">
          <div style={{backgroundImage:`url(${userLogo})`}} id="userLogo"></div>
          <Link to="/profile">
         
            <div className="headerProfile">
              Narendra
              <img
                src="https://img.icons8.com/color/48/000000/sort-down.png"
                width="10px"
              />
            </div>
          </Link>
          <Link to="/cart">
            <div className="headerCart">
              <div className="headerCardIcon">
              <Badge badgeContent={4} color="primary">
  <ShoppingBagIcon color="white" />
</Badge>
                {/* <img
                  width="25px"
                  src="https://img.icons8.com/fluency/48/000000/shopping-bag.png"
                /> */}
              </div>
              Cart
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
