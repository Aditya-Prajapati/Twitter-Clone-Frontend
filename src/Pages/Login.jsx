import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginStyle.css";
import axios from "axios";
import LoginButton from "./LoginButton";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import TwitterIcon from "@mui/icons-material/Twitter";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Login(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pswrd, setPswrd] = useState("");
    const [loginMsg, setLoginMsg] = useState(props.signedUpMsg);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios
                .post(
                    "https://twitter-clone-backend-in-progress-33v4v2axp-aditya-prajapati.vercel.app/auth/login",
                    { username: email, password: pswrd },
                    { withCredentials: true },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    if (res.status === 200) {
                        props.setUser(res.data.user);
                        navigate("/home");
                    } 
                    else {
                        navigate("/login");
                    }
                })
        }
        catch(err){
            console.log(err);
            setLoginMsg("Invalid Credentials");
        }
    };

    return (
        <div className="card align-items-center" id="Login">
            <div className="TwitterIcon d-flex justify-content-center">
                <TwitterIcon style={{ fontSize: "2rem", color: "#1DA1F2" }} />
            </div>

            <h2 className="HeadingText">Sign in to Twitter</h2>
            <LoginButton link="https://twitter-clone-backend-in-progress-33v4v2axp-aditya-prajapati.vercel.app/auth/google" icon={<GoogleIcon />} text={"Sign in with Google"} />
            <LoginButton link="/notfound" icon={<AppleIcon />} text={"Sign in with Apple"} />

            <hr className="Or-line" />

            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100">
                <input
                    name="email"
                    onChange={(e) => {
                        setLoginMsg(false);
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
                            setLoginMsg(false);
                            setPswrd(e.target.value);
                        }}
                        className="LoginInput contact center-placeholder "
                        type={showPassword ? "text" : "password"}
                        placeholder="Password "
                        autoComplete="on"
                    />
                <a onClick={() => { setShowPassword(showPassword === true ? false : true) }}> 
                        {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" /> } 
                    </a>
                </div>

                <p style={{ color: `${loginMsg === "Successfully signed up, please login." ? "green" : "red"}`, marginTop: "2px", height: "10px" }}> {loginMsg} </p>

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

            <LoginButton link="/notfound" text={"Forget Password"} style={{ fontWeight: "bold" }} />

            <div className="NotAccount d-flex">
                <p>Don't have an account? &nbsp; </p>
                <Link to="/signup"> Signup </Link>
            </div>
        </div>
    );
}
