import React from "react";
import { useMediaQuery } from "react-responsive";
import "../components/App.css";

import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import Tweet from "../components/Feed/Tweet";
import SidePanel from "../components/SidePanel/SidePanel";
import Header from "../components/Header/Header.jsx";
import ProfileBox from "../components/ProfileBox/ProfileBox";

export default function Profile(){

    const isDesktop = useMediaQuery({
        query: "(min-width: 1000px)"
    })

    const isTablet = useMediaQuery({ 
        query: "(min-width: 600px)"
    })

    const isMobile = useMediaQuery({
        query: "(max-width: 599px)"
    })

    return (
        <div className="d-flex main-container">
            
            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar />}
            </div>

            <div className="d-inline-flex flex-column feed">
                {(isTablet || isDesktop) && <Header heading="Profile" subHeading="" />}
                <ProfileBox />
                <Tweet />
                {isMobile && <MobileNavbar />}
            </div>

            <div className={"d-inline-flex flex-column side-panel-container"}>

                {isDesktop && <div className="sticky-top">
                    <Searchbar />
                    <SidePanel />
                </div>} 

            </div>

        </div>
    );
}