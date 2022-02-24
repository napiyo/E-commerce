import React, { useEffect, useState } from "react";
import "./profile.css";
import { Avatar, Button, Divider, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Redux/UserActions";
import api from "../config/axiosApi";
import userDp from "../assests/user.jpeg";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.UserReducer);
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if (!userState.isauthenticated) {
      navigate("/auth");
    }
    api
      .get("/api/v2/users/profile")
      .then((res) => {
        setuser({ ...res.data.user });
        setloading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userState.isauthenticated]);

  const logout = () => {
    api
      .post("http://localhost:4500/api/v2/users/logout")
      .then(() => {
        dispatch(logOut());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading) {
    return (
      <>
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      </>
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
          <div className="leftSectionbottomItem currentSectionTitleProfile">
            My Personal Details
          </div>
          <Divider />
          <div className="leftSectionbottomItem">My orders</div>
          <Divider />
          <Button variant="contained" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>

      <div className="rightSectionProfile">
        <div className="profile_right_personalDetails rightProfileSection">
          <div style={{ width: "100%", textAlign: "end" }}>
            <Button variant="contained">Edit</Button>
          </div>
          <div className="sectionTitleProfile">Personal Details</div>
          <div className="personalDetails">
            <TextField
              value={user.name}
              disabled
              variant="outlined"
              label="name"
            />
          </div>
          <div className="sectionTitleProfile">Contact Details</div>
          <div className="personalDetails">
            <TextField
              value={user.email}
              disabled
              variant="outlined"
              label="Email"
            />
          </div>
          <div className="sectionTitleProfile">Password</div>
          <div style={{ display: "flex", columnGap: "1vmax" }}>
            <Button variant="outlined">Change Password</Button>
            <Button variant="outlined">Forgot Password</Button>
          </div>
        </div>
        <div className="myorderSectionProfile rightProfileSection">
          <div className="sectionTitleProfile ">
            My orders
          </div>
          
        </div>
      </div>
    </div>
  );
}
