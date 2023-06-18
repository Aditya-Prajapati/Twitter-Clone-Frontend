import React from "react";
import GeneralButton from "../Buttons/GeneralButton";
import NameAndId from "../ProfileBox/NameAndId";
import ProfileImage from "../ProfileImage";
import "./SidePanel.css";
import axios from "axios";

export default function SidePanelItem(props) {

    if (props.user.username.length > 22){
        props.user.username = (props.user.username.substring(0, 21) + "...");
    }

    return (
        <li className="d-flex list-group-item my-1 bgc-white side-panel-item">

            {/* Image */}
            <div className="me-1 pe-2">
                <div href="#" className="anchor d-inline-flex align-items-center justify-content-center">
                    <ProfileImage width={46} height={46} user={props.user} />
                </div>
            </div>

            {/* Content */}
            <div className="d-flex align-items-center justify-content-between side-panel-item-content">
                <NameAndId user={props.user} />
                <GeneralButton followUser={true} bgc="#282829" color="white" text="Follow" />
            </div>
            
        </li>
    );
}