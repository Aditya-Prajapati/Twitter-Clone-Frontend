import React from "react";
import NavItem from "./NavItem";
import "./MobileNavbar.css";
import { faHouse, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";

export default function MobileNavbar(){

    return (
        <div className="fixed-bottom bgc-white mobile-navbar">

            <ul className="nav justify-content-between mx-5">
                <NavItem link={"/"} iconName={faHouse} iconColor={"black"} iconSize={"l"} style={{ padding: ".5rem" }} /> 
                <NavItem link={"/explore"} iconName={faHashtag} iconColor={"black"} iconSize={"l"} style={{ padding: ".5rem" }} />
                <NavItem link={"/profile"} iconName={faUser} iconColor={"black"} iconSize={"l"} style={{ padding: ".5rem" }} /> 
            </ul>

        </div>
    );
}