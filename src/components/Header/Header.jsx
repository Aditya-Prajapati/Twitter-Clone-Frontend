import React from "react";
import "./Header.css";

export default function Header(props){

    return (
        <nav className="header">

            <h5 className="mb-1"> {props.heading} </h5>
            <p> {props.subHeading} </p>
            
        </nav>
    );
}