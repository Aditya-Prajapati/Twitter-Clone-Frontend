import React from "react";
import { Link } from "react-router-dom";
import "./Buttons.css";

export default function FollowButton(props){
    
    return (
            <Link to={props.to} className="d-flex align-items-center justify-content-center general-button-container">

                <button
                    className={"general-button " + props.classNames}
                    type={props.type} 
                    style={{ backgroundColor: `${props.bgc}`, ...props.style }}
                >
                    <div  className="anchor" style={{ color: `${props.color}` }}> 
                        {props.svg}
                        {props.text} 
                    </div> 
                </button>
                
            </Link>
    );
}