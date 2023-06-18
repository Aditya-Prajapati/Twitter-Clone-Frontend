import React, { useState } from "react";
import GeneralButton from "../Buttons/GeneralButton";
import NameAndId from "../ProfileBox/NameAndId";
import ProfileImage from "../ProfileImage";
import "./SidePanel.css";
import axios from "axios";

export default function SidePanelItem(props) {

    const [following, setFollowing] = useState(false);
    let randomUserCopy = JSON.parse(JSON.stringify(props.randomUser));

    if (randomUserCopy.username.length > 18){
        randomUserCopy.username = (randomUserCopy.username.substring(0, 18) + "...");
    }

    return (
        <li className="d-flex list-group-item my-1 bgc-white side-panel-item">

            {/* Image */}
            <div className="me-1 pe-2">
                <div href="#" className="anchor d-inline-flex align-items-center justify-content-center">
                    <ProfileImage width={46} height={46} user={props.randomUser} />
                </div>
            </div>

            {/* Content */}
            <div className="d-flex align-items-center justify-content-between side-panel-item-content">
                <NameAndId user={randomUserCopy} />
                <GeneralButton requestId={1} user={props.user} followUpdated={props.followUpdated} setFollowUpdated={props.setFollowUpdated} setUser={props.setUser} randomUser={props.randomUser} bgc={following ? "white" : "#282829"} color={following ? "#282829" : "white"} text={following ? "Following" : "Follow"} setFollowing={setFollowing} />
            </div>
            
        </li>
    );
}