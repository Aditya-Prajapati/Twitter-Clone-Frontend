import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/App.css";

import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import TweetArea from "../components/Feed/TweetArea";
import Tweet from "../components/Feed/Tweet";
import SidePanel from "../components/SidePanel/SidePanel";
import Header from "../components/Header/Header";

export default function Home(props){

    const navigate = useNavigate();
    const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 599px)" });

    const [deleteTweet, setDeleteTweet] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);
    const [tweets, setTweets] = useState(null);

    useEffect(() => {
        const getTweets =  () => {
            axios.
                get("http://localhost:8000/tweet/gettweets", {
                    withCredentials: true,
                    params: { all: true }
                }
                )
                .then((res) => {
                    if (res.status === 200){
                        setTweets(res.data.tweets.reverse());
                    }

                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        getTweets();
    }, [])

    if (isLoading){
        return <div> Loading... </div>;
    }

    return (
        <div className="d-flex main-container">
            
            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar setAuth={props.setAuth} />}
            </div>

            <div className="d-inline-flex flex-column feed">
                {(isTablet || isDesktop) && <Header heading="Home" subHeading="" />}
                <TweetArea user={props.user} />

                {tweets.map((tweet, index) => {
                    return <Tweet key={index} tweet={tweet} user={props.user} setDeleteTweet={setDeleteTweet} />;
                })}
                {isMobile && <MobileNavbar />}
            </div>

            <div className={"d-inline-flex flex-column side-panel-container"}>

                {isDesktop && <div className="sticky-top">
                    <Searchbar style={{ width: "100%" }} />
                    <SidePanel user={props.user} />
                </div>} 

            </div>

        </div>
    );
}