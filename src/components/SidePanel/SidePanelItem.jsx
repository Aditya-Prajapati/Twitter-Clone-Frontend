import React, { useState, useEffect } from "react";
import GeneralButton from "../Buttons/GeneralButton";
import NameAndId from "../ProfileBox/NameAndId";
import ProfileImage from "../ProfileImage";
import "./SidePanel.css";
import axios from "axios";

export default function SidePanelItem(props) {

    let userToMapCopy = JSON.parse(JSON.stringify(props.userToMap));
    const [buttonText, setButtonText] = useState("");
    
    if (!props.followPage && userToMapCopy.username.length > 16) {
        userToMapCopy.username = (userToMapCopy.username.substring(0, 16) + "...");
    }
    
    useEffect(() => {
        const temp = props.user.follows.filter((follows) => {
            return follows.username === props.userToMap.username;
        });
        
        setButtonText(temp.length ? "Following" : "Follow");
    }, [props.user.follows, props.userToMap.username]);
    

    return (
        <li className="d-flex list-group-item my-1 bgc-white side-panel-item " style={props.style}>

            {/* Image */}
            <div className="me-1 pe-2">
                <div href="#" className="anchor d-inline-flex align-items-center justify-content-center">
                    <ProfileImage width={46} height={46} user={props.userToMap} />
                </div>
            </div>

            {/* Content */}
            <div className="d-flex align-items-center justify-content-between side-panel-item-content">
                <NameAndId user={userToMapCopy} />
                <GeneralButton
                    requestId={0}
                    user={props.user}
                    followUpdated={props.followUpdated}
                    setFollowUpdated={props.setFollowUpdated}
                    userToMap={props.userToMap}
                    bgc={buttonText === "Following" ? "white" : "#282829"}
                    color={buttonText === "Following" ? "#282829" : "white"}
                    text={buttonText}
                    setButtonText={setButtonText}
                />
            </div>

        </li>
    );
}