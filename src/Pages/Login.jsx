import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginStyle.css";
import axios from "axios";
import LoginButton from "./LoginButton";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Login(props) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pswrd, setPswrd] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    await axios.post(
      "http://localhost:3000",
      { username: email, password: pswrd },
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => {
        if (response.data === "Successfully LoggedIn.") {
          console.log("Successfully LoggedIn.");
          navigate("/home");
        }
        else {
          navigate("/login");
        }
      })
  }

  return (
    <div className="card " id="Login">
      <div className="TwitterIcon d-flex justify-content-center">
        <TwitterIcon style={{ fontSize: "2rem", color: "#1DA1F2" }} />
      </div>

      <h2 className="HeadingText">Sign To Twitter</h2>
      <LoginButton icon={<GoogleIcon />} text={"Sign in with Google"} />
      <LoginButton icon={<AppleIcon />} text={"Sign in with Apple"} />

      <div className="d-flex Or-line">
        <hr />
        <button className="or"> or </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={(e) => { setEmail(e.target.value) }}
          className="LoginButton contact center-placeholder "
          type="text"
          placeholder="Phone, email or username "
        />

        <input
          name="password"
          onChange={(e) => { setPswrd(e.target.value) }}
          className="LoginButton contact center-placeholder "
          type="text"
          placeholder="Password "
        />

        <LoginButton
          text={"Submit"}
          style={{ fontWeight: "bold", backgroundColor: "black", color: "white" }}
          type="submit"
        />

      </form>

      <LoginButton text={"Forget Password"} style={{ fontWeight: "bold" }} />

      <div className="NotAccount d-flex">
        <p>Don't have an account? </p>
        <Link to="/signup"> Signup </Link>
      </div>
    </div>
  );
}
