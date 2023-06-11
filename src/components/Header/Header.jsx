import React from "react";
import "./Header.css";

export default function Header(props){

    return (
        <nav className="header">

            <p className="mb-1"> {props.heading} </p>
            <p> {props.subHeading} </p>
            
        </nav>
    );
}