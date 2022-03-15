import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import userLogo from "../assests/user.jpeg";
import "./header.css";
import {Badge, Button, TextField} from '@mui/material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {useDispatch, useSelector} from 'react-redux'
import {useCookies} from 'react-cookie'
import api from "../config/axiosApi";
import { useAlert } from 'react-alert'
import {LoggedIn} from '../Redux/UserActions'
export default function Header() {
  const cartState =useSelector((state) => state.CartReducer);
  const [cookies, setcookies] = useCookies();
  const userState = useSelector((state)=> state.UserReducer);
  const dispatch = useDispatch();
  // const [loading, setloading] = useState(true);
  const [searchQuery, setsearchQuery] = useState("");
  const alert = useAlert()
  useEffect(() => {
  
   if(cookies.token){
     api.get('/api/v2/users/profile').then((res)=>{
    
       dispatch(LoggedIn(res.data.user));

     }).catch((e)=>{
      alert.error(e.response.data.message || "something went wrong")
      //  dispatch(logOut());
     })
     
   }
  //  setloading(false);
  }, [userState.isauthenticated]);
  const navigate = useNavigate();
  const search =()=>{
        navigate(`/search?keyword=${searchQuery}`);
  }
  return (
    <>
      <div className="header">
        <div className="searchBox">
          <img
            id="headerSearchIcon"
            src="https://img.icons8.com/color/48/000000/search--v1.png"
          />
        
          {/* <input type="search" id="searchBar" placeholder="Search books..." value={searc} /> */}
          <TextField
          value={searchQuery}
          onChange={(e)=>setsearchQuery(e.target.value)}
          variant='standard'
          placeholder="search"
          ></TextField>
        <Button variant="outlined" disabled={searchQuery.length==0} onClick={search}>Search</Button>
        </div>
        <Link to="/">
          <div className="headerLogo" style={{ cursor: "pointer" }}>
            <img src={logo} alt="logo" width="30px" />
          </div>
        </Link>
        <div className="headerMenu">

          {(!userState.isauthenticated)?<Link to='/auth' >
            <Button variant="outlined">login/signup</Button>
          </Link>:
          <>
          <div style={{backgroundImage:`url(${userLogo})`}} id="userLogo"></div>
            <Link to="/profile/">
            <div className="headerProfile">
             {userState.name}
              <img
                src="https://img.icons8.com/color/48/000000/sort-down.png"
                width="10px"
              />
            </div>
          </Link>
          </>
}
          <Link to="/cart">
            <div className="headerCart">
              <div className="headerCardIcon">
              <Badge badgeContent={cartState.length} color="primary">
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
        <div>
          
        </div>
   
      
    </>
  );
}
