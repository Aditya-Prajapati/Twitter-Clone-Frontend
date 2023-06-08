import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GeneralButton from "../components/Buttons/GeneralButton";
import LoginButton from "./LoginButton";
import "./Signup.css";
import axios from "axios";

export default function Signup(props) {

    const navigate = useNavigate();

    const googleSVG = <svg xmlns='http://www.w3.org/2000/svg' width='27px' height='27px' style={{ margin: '0 14px' }} preserveAspectRatio='xMidYMid' viewBox='0 0 256 262' id='google'><path fill='#4285F4' d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'></path><path fill='#34A853' d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'></path><path fill='#FBBC05' d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'></path><path fill='#EB4335' d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'></path></svg>;

    const [email, setEmail] = useState("");
    const [pswrd, setPswrd] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        await axios.post(
            "http://localhost:8000/signup",
            { username: email, password: pswrd },
            { withCredentials: true },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then((response) => {
                if (response.data === "Registration Successful.") {
                    navigate("/login");
                }
            })
    }

    function handleGoogleSignup() {
        axios
            .get("http://localhost:8000/auth/google")
            .then((res) => {
                if (res.status == 200) {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="signup-panel-container">
            <div className={"d-inline-flex bgc-white signup-panel mb-3 pb-3 " + props.classNames}>

                <ul className="list-group" >
                    <h5 className="ms-1 p-4 pb-2">New to Twitter ?</h5>

                    <li className="d-flex bgc-white list-group-item justify-content-center signup-panel-item">
                        <GeneralButton onClick={handleGoogleSignup} svg={googleSVG} text="Sign up with Google" bgc="white" color="black" classNames="py-2" />
                    </li>
                    <li>

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

                    </li>
                </ul>

            </div>
        </div >
    );
}