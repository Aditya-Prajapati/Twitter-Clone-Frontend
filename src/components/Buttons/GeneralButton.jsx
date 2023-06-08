import React from "react";
import { Link } from "react-router-dom";
import "./Buttons.css";

export default function FollowButton(props){
    
    return (
        <div className="d-flex align-items-center justify-content-center general-button-container">

            <button 
                className={"general-button " + props.classNames}
                type={props.type} 
                style={{ backgroundColor: `${props.bgc}`, ...props.style }}>

                <Link to={props.to} className="anchor" style={{ color: `${props.color}` }}> 
                    {props.svg}
                    {props.text} 
                </Link> 
            </button>

        </div>
    );
}