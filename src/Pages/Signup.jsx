import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralButton from "../components/Buttons/GeneralButton";
import LoginButton from "./LoginButton";
import "./LoginStyle.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Signup(props) {

    const navigate = useNavigate();
    const googleSVG = <svg xmlns='http://www.w3.org/2000/svg' width='27px' height='27px' style={{ margin: '0 14px' }} preserveAspectRatio='xMidYMid' viewBox='0 0 256 262' id='google'><path fill='#4285F4' d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'></path><path fill='#34A853' d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'></path><path fill='#FBBC05' d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'></path><path fill='#EB4335' d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'></path></svg>;

    const [email, setEmail] = useState("");
    const [pswrd, setPswrd] = useState("");
    const [confirmPswrd, setConfirmPswrd] = useState("");
    const [signUpMsg, setSignupMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email == "" || pswrd == ""){
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
                { username: email, password: pswrd },
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