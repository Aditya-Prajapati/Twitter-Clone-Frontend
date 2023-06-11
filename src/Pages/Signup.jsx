import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginButton from "./LoginButton";
import "./LoginStyle.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Signup(props) {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pswrd, setPswrd] = useState("");
    const [confirmPswrd, setConfirmPswrd] = useState("");
    const [signUpMsg, setSignupMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name == "" || email == "" || pswrd == ""){
            setSignupMsg("Invalid credentials")
            return;
        }
        else if (pswrd !== confirmPswrd){
            setSignupMsg("Passwords aren't matching");
            return;
        }
 
        await axios
            .post(
                "http://localhost:8000/auth/signup",
                { name: name, username: email, password: pswrd },
                { withCredentials: true },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                props.setSignedUpMsg("Successfully signed up, please login.");
                navigate("/");
            })
            .catch((err) => {

                if (err.response.status === 403){
                    setSignupMsg(err.response.data.message);
                }
                else if (err.response.status === 500){
                    setSignupMsg("Internal server error, please try again.")
                }
                else {
                    setSignupMsg("Invalid credentials");
                }
            })
    }

    return (
        <div className="card align-items-center" id="Login">
            <div className="TwitterIcon d-flex justify-content-center">
                <TwitterIcon style={{ fontSize: "2rem", color: "#1DA1F2" }} />
            </div>

            <h2 className="HeadingText">New to Twitter ? </h2>
            <LoginButton link="http://localhost:8000/auth/google" icon={<GoogleIcon />} text={"Sign up with Google"} />
            <LoginButton link="/notfound" icon={<AppleIcon />} text={"Sign up with Apple"} />

            <hr className="Or-line" />

            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100">
                <input
                    name="name"
                    onChange={(e) => {
                        setSignupMsg(false);
                        setName(e.target.value);
                    }}
                    className="LoginInput contact center-placeholder "
                    type="text"
                    placeholder="Name"
                    autoComplete="on"
                />

                <input
                    name="email"
                    onChange={(e) => {
                        setSignupMsg(false);
                        setEmail(e.target.value);
                    }}
                    className="LoginInput contact center-placeholder "
                    type="email"
                    placeholder="Email"
                    autoComplete="on"
                />

                <div className="passwordContainer">
                    <input
                        name="password"
                        onChange={(e) => {
                            setSignupMsg(false);
                            setPswrd(e.target.value);
                        }}
                        className="LoginInput contact center-placeholder "
                        type={showPassword ? "text" : "password"}
                        placeholder="Password "
                        autoComplete="on"
                    />
                    <a onClick={() => { setShowPassword(true) }}> 
                        {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" /> } 
                    </a>
                </div>

                <div className="passwordContainer">
                    <input
                        name="confirmPswrd"
                        onChange={(e) => {
                            setSignupMsg(false);
                            setConfirmPswrd(e.target.value);
                        }}
                        className="LoginInput contact center-placeholder "
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        autoComplete="on"
                    />
                    <a onClick={() => { setShowPassword(showPassword ? false : true) }}> 
                        {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" /> } 
                    </a>
                </div>

                <p style={{ color: "red", marginTop: "2px", height: "10px" }}> {signUpMsg} </p>

                <LoginButton
                    text={"Submit"}
                    style={{
                        fontWeight: "bold",
                        backgroundColor: "black",
                        color: "white"
                    }}
                    className="submit"
                    type="submit"
                />
            </form>

            <div className="NotAccount d-flex">
                <p>Already have an account? &nbsp; </p>
                <Link to="/"> Signin </Link>
            </div>
        </div>
    );
}