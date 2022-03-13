import React, { useEffect, useState } from "react";
import "./profile.css";
import { Avatar, Button, Divider, Skeleton, TextField } from "@mui/material";
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
    // api
    //   .get("/api/v2/users/profile")
    //   .then((res) => {
    //     setuser({ ...res.data.user });
        setloading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, [user]);

  const logout = () => {
    api
      .post("http://localhost:4500/api/v2/users/logout")
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
            My Personal Details
      
          </NavLink> 
          <Divider />
          <NavLink to={'./myorders'} className={({ isActive }) =>
            isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
            }>My orders
         </NavLink>
          <Divider />
         {(user.role==='admin')? <Link to='/admin/dashboard' className="leftSectionbottomItem">Admin Dashboard</Link>
        :"" 
        }
          <Button variant="contained" onClick={logout}>
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
