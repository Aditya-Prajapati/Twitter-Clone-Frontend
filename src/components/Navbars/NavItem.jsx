import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavItems(props){

    const navItemStyle = {
        padding: "1rem",
        ...props.style
    }

    return (
        <li className="nav-item">

            <div className="nav-link" style={navItemStyle}>
                <FontAwesomeIcon icon={props.iconName} color={props.iconColor} size={props.iconSize} />
            </div>
            
        </li>  
    );
}