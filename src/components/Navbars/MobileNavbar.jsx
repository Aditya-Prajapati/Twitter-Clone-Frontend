import React from "react";
import NavItem from "./NavItem";
import "./MobileNavbar.css";
import ProfileImage from "../ProfileImage";
import { faHouse, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";

export default function MobileNavbar(){

    function handleLogout(){
        window.open("https://twitter-clone-frontend-in-progress.vercel.app/auth/logout", "_self");
    }

    return (
        <div className="fixed-bottom bgc-white mobile-navbar">

            <ul className="nav justify-content-between mx-5">
                <NavItem link={"/home"} iconName={faHouse} iconColor={"black"} iconSize={"l"} style={{ padding: ".5rem" }} /> 
                <NavItem link={"/explore"} iconName={faHashtag} iconColor={"black"} iconSize={"l"} style={{ padding: ".5rem" }} />
                <NavItem link={"/profile"} iconName={faUser} iconColor={"black"} iconSize={"l"} style={{ padding: ".5rem" }} /> 
                {/* Add logout functioality for mobiles */}
                {/* <div className="dropdown">
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis dropdown-toggle" data-bs-toggle="dropdown">
                        <ProfileImage width={14} height={14} />
                    </a>

                    <ul className="dropdown-menu text-small shadow">
                        <li>
                            <a className="dropdown-item" href="#" onClick={handleLogout}> Logout </a>
                        </li>
                    </ul>
                </div> */}
            </ul>

        </div>
    );
}