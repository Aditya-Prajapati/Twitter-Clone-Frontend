import React from "react";
import SidePanelItem from "./SidePanelItem";
import "./SidePanel.css";

export default function SidePanel(props){

    return (  
        <div className={"d-inline-flex bgc-white side-panel " + props.classNames}>

            <ul className="list-group" >
                <h5 className="ms-1 p-4 pb-2">Who to follow</h5>

                <SidePanelItem />
                <SidePanelItem />
            </ul>

        </div>
    );
}