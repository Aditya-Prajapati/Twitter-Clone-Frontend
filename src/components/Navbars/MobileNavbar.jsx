import React from "react";
import NavItem from "./NavItem";
import "./MobileNavbar.css";
import ProfileImage from "../ProfileImage";
import { faHouse, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MobileNavbar(props){

    const navigate = useNavigate();

    function handleLogout(){
        axios.post("https://twitter-clone-backend-in-progress.vercel.app/auth/logout",
        {},
        { withCredentials: true }
        )
        .then((res) => {
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="fixed-bottom mobile-navbar">

            <ul className="nav justify-content-between align-items-center mx-4">
                <div className="mobile-navbar-nav-item">
                    <NavItem link={"/home"} iconName={faHouse} iconColor={"black"} iconSize={"l"} /> 
                </div>
                <div className="mobile-navbar-nav-item">
                    <NavItem link={"/explore"} iconName={faHashtag} iconColor={"black"} iconSize={"l"} />
                </div>
                <div className="mobile-navbar-nav-item">
                    <NavItem link={"/profile"} iconName={faUser} iconColor={"black"} iconSize={"l"} /> 
                </div>
                
                <div className="dropdown">
                    <div href="#" className="d-flex align-items-center justify-content-center link-body-emphasis dropdown-toggle" data-bs-toggle="dropdown">
                        <ProfileImage width={28} height={28} user={props.user} />
                        <ul className="dropdown-menu text-small shadow">
                            <li>
                                <a className="dropdown-item" href="#" onClick={handleLogout}> Logout </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </ul>

        </div>
    );
}
