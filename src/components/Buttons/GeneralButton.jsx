import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Buttons.css";
import axios from "axios";

const handleFollow = (user, setUser, randomUser, setButtonText, setFollowing, followUpdated, setFollowUpdated) => {
    console.log("objecasdfsd");
    axios
        .post("http://localhost:8000/follow",
        {
            randomUser: randomUser
        },
        { withCredentials: true }
        )
        .then((res) => {
            {setFollowUpdated && setFollowUpdated(!followUpdated)}
            if (res.data.message === "Follows Decremented"){
                setButtonText("Follow")
                setFollowing(false);
            } 
            else {
                setButtonText("Following")
                setFollowing(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

export default function GeneralButton(props){
    /* (props.requestId == 1) -> followButton
    */

    const [buttonText, setButtonText] = useState(props.text);

    return (
            <Link to={props.to} className="d-flex align-items-center justify-content-center general-button-container">

                <button
                    onClick={() => {props.requestId == 1 && handleFollow(props.user, props.setUser, props.randomUser, setButtonText, props.setFollowing, props.followUpdated, props.setFollowUpdated)}}
                    className={"general-button " + props.classNames}
                    type={props.type} 
                    style={{ backgroundColor: `${props.bgc}`, ...props.style }}
                >
                    <div className="anchor" style={{ color: `${props.color}` }}> 
                        {props.svg}
                        {props.text} 
                    </div> 
                </button>
                
            </Link>
    );
}