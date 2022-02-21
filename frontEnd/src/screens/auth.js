import { Button, TextField } from "@mui/material";
import "./auth.css";
import React, { useRef, useState } from "react";
import api from "../config/axiosApi";

export default function Auth() {
  const leftContainer = useRef(null);
  const rightContainer = useRef(null);
  const leftOverlay = useRef(null);
  const rightOverlay = useRef(null);

  function slideLeft() {
    // leftContainer.current.style.transform='translate(100%)';
    leftContainer.current.style.opacity = 0;
    leftContainer.current.style.zIndex = 0;
    //  rightContainer.current.style.transform='translate(-100%)';
    rightContainer.current.style.opacity = 1;
    rightContainer.current.style.zIndex = 1;
    rightOverlay.current.style.transform = "translate(-100%)";
    rightOverlay.current.style.opacity = 0;
    rightOverlay.current.style.zIndex = 0;

    // rightOverlay.current.style.opacity=1;
    leftOverlay.current.style.opacity = 1;
    leftOverlay.current.style.zIndex = 1;
  }

  function slideRight() {
    leftContainer.current.style.opacity = 1;
    leftContainer.current.style.zIndex = 1;
    //  rightContainer.current.style.transform='translate(-100%)';
    rightContainer.current.style.opacity = 0;
    rightContainer.current.style.zIndex = 0;
    rightOverlay.current.style.transform = "translate(0%)";
    rightOverlay.current.style.opacity = 1;
    rightOverlay.current.style.zIndex = 1;
    leftOverlay.current.style.opacity = 0;
    leftOverlay.current.style.zIndex = 0;
  }

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [signupEmail, setsignupEmail] = useState("");
  const [signupPassword, setsignupPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);

  const login = () => {
    
    
    api
      .post("/api/v2/users/login", {
        email: loginEmail,
        password: loginPassword
      },{headers:{'Content-Type':"application/json"}})
      .then((res) => {
        console.log(res.data);
        setloggedIn(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const logout = () => {
    api
      .post("/api/v2/users/logout")
      .then((res) => {
        console.log(res.data);
        setloggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loggedIn) {
    return (
      <div>
        this is logged in
        <Button onClick={logout} variant="contained">
          logout
        </Button>
      </div>
    );
  }

  return (
    <div id="mainBackground">
      <div className="mainContainerAuth">
        <div className="leftContainer" ref={leftContainer}>
          <div className="loginContent">
            <h1 style={{ textAlign: "center", marginBottom: "-10px" }}>
              LOG IN
            </h1>
            <p style={{ textAlign: "center", marginBottom: "10px" }}>
              get all movies details
            </p>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => {
                setloginEmail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => {
                setloginPassword(e.target.value);
              }}
            ></input>
            <button id="logInBtn" onClick={login}>
              LOGIN
            </button>
          </div>
        </div>
        <div className="leftOverlay" ref={leftOverlay}>
          <h1>Already have an Account ??</h1>
          <button id="slideRight" onClick={slideRight}>
            Log in here
          </button>
        </div>
        <div className="rightContainer" ref={rightContainer}>
          <div className="SignupContent">
            <h1 style={{ textAlign: "center", marginBottom: "-10px" }}>
              SIGN IN
            </h1>
            <p style={{ textAlign: "center", marginBottom: "10px" }}>
              get all movies details
            </p>
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => {
                setsignupEmail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => {
                setsignupPassword(e.target.value);
              }}
            ></input>
            <button id="signupBtn">SIGN UP</button>
          </div>
        </div>
        <div className="rightOverlay" ref={rightOverlay}>
          <h1>Dont have an Account yet ??</h1>
          <button id="slideLeftBtn" onClick={slideLeft}>
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
}
