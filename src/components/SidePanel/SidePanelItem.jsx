import React from "react";
import GeneralButton from "../Buttons/GeneralButton";
import NameAndId from "../ProfileBox/NameAndId";
import ProfileImage from "../ProfileImage";
import "./SidePanel.css";

export default function SidePanelItem() {

    return (
        <li className="d-flex list-group-item my-1 bgc-white side-panel-item">

            {/* Image */}
            <div className="me-1 pe-2">
                <a href="#" className="anchor d-inline-flex align-items-center justify-content-center">
                    <ProfileImage width={46} height={46} />
                </a>
            </div>

            {/* Content */}
            <div className="d-flex align-items-center justify-content-between side-panel-item-content">
                <NameAndId />
                <GeneralButton bgc="rgb(39, 44, 48)" color="white" text="Follow" />
            </div>
            
        </li>
    );
}