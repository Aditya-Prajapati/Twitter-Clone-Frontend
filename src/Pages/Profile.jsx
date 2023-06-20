import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import "../components/App.css";

import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import Tweet from "../components/Feed/Tweet";
import SidePanel from "../components/SidePanel/SidePanel";
import Header from "../components/Header/Header.jsx";
import ProfileBox from "../components/ProfileBox/ProfileBox";

export default function Profile(props){

    const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 599px)" });

    const [deleteTweet, setDeleteTweet] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);
    const [tweets, setTweets] = useState(null);
    const [followUpdated, setFollowUpdated] = useState(false);

    useEffect(() => {
        const getTweets = () => {
            axios.
                get("https://twitter-clone-backend-in-progress-czz4r2p10-aditya-prajapati.vercel.app/tweet/gettweets",{
                    withCredentials: true,
                    params: { all: false }
                }
                )
                .then((res) => {
                    if (res.status === 200){
                        setTweets(res.data.tweets.reverse());
                    }

                    setIsLoading(false);
                    setDeleteTweet(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        getTweets();
    }, [deleteTweet])

    if (isLoading){
        return <div> Loading... </div>;
    }

    return (
        <div className="d-flex main-container" id="profile">
            
            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar user={props.user} />}
            </div>

            <div className="d-inline-flex flex-column feed">
                <Header heading="Profile" subHeading="" />
                <ProfileBox user={props.user} setUser={props.setUser} followUpdated={followUpdated} />
                <Header heading="Your tweets" />

                {tweets.map((tweet, index) => {
                    return <Tweet key={index} tweet={tweet} user={props.user} setDeleteTweet={setDeleteTweet} />;
                })}
                {isMobile && <MobileNavbar />}
            </div>

            <div className={"d-inline-flex flex-column side-panel-container"}>

                {isDesktop && <div className="sticky-top">
                    <Searchbar style={{ width: "100%" }} />
                    <SidePanel user={props.user} setUser={props.setUser} followUpdated={followUpdated} setFollowUpdated={setFollowUpdated} />
                </div>} 

            </div>

        </div>
    );
}