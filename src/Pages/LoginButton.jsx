import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyle.css";

export default function LoginButton(props) {

  const navigate = useNavigate();

  function handleGoogleLogin(){

    window.open("http://localhost:8000/auth/google", "_self") 

    // axios
    //   .get("http://localhost:8000/auth/google", {
    //     headers: {
    //       "Access-Control-Allow-Credentials": true
    //     }
    //   })
    //   .then((res) => {
    //     if (res.status == 200){
    //       props.setAuth(true);
    //       navigate("/home");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  }
  
  const styling ={
    ...props.style,
  }
  
  return (
    <a onClick={ handleGoogleLogin } style={{ textDecoration: "none" }}>
      <button className="d-flex bd-highlight rounded-pill LoginButton" type={props.type} style = {styling}>
    
          {props.icon}
          <span className="ms-2"> {props.text} </span>

      </button>
    </a>
  );
}
