import React, { useEffect, useState } from "react";
import "./profile.css";
import { Avatar, Button, Divider, Skeleton, TextField } from "@mui/material";
import {ManageAccounts,History, AdminPanelSettings, Logout} from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Redux/UserActions";
import api from "../config/axiosApi";
import userDp from "../assests/user.jpeg";
import { useAlert } from 'react-alert'
import { Outlet, useNavigate,NavLink, Link } from "react-router-dom";
import MyBackDrop from "../utils/backDrop";

// import PersonalDetails from "../ProfileComponents/personalDetails";
export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [user, setuser] = useState({});
  const [loading, setloading] = useState(true);
  const alert = useAlert()

  const user = useSelector((state)=>state.UserReducer)
  useEffect(() => {
    
    if ( user.loaded && !user.isauthenticated) {
      navigate("/auth");
    }

        setloading(false);

  }, [user.id]);

  const logout = () => {
    api
      .post("/api/v2/users/logout")
      .then(() => {
        dispatch(logOut());
        alert.success("log out succesfully")
      })
      .catch((e) => {
       console.log(e);
      });
  };
  if (loading) {
    return (
      <div style={{height:'100vh'}}>
       <MyBackDrop open={true}/>
      </div>
    );
  }
  return (
    <div className="profileBody">
      <div className="leftSectionProfile">
        <div className="leftSecionWelcome">
          <Avatar src={userDp}></Avatar>
          <div>
            <div style={{ fontSize: "0.8em" }}>Hello</div>
            <div style={{ fontWeight: 500 }}>{user.name.toUpperCase()}</div>
          </div>
        </div>
        <div className="leftSectionbottom">
          
        <NavLink
            to="./"
            className={({ isActive }) =>
              isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
            }
          > 
           <ManageAccounts /> My Personal Details
      
          </NavLink> 
          <Divider />
          <NavLink to={'./myorders'} className={({ isActive }) =>
            isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
            }> <History /> My orders
         </NavLink>
          <Divider />
         {(user.role==='admin')? <Link to='/admin/dashboard' className="leftSectionbottomItem"> <AdminPanelSettings /> Admin Dashboard</Link>
        :"" 
        }
          <Button variant="contained"  startIcon={<Logout />} onClick={logout} sx={{width:'100%',marginTop:"1vmax"}}>
     Log out
          </Button>
        </div>
      </div>

      <div className="rightSectionProfile">
        {<Outlet />}
      </div>
    </div>
  );
}
