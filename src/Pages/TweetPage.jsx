import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import "../components/App.css";
import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import Tweet from "../components/Feed/Tweet";
import SidePanel from "../components/SidePanel/SidePanel";
import Header from "../components/Header/Header";

export default function TweetPage(props){

    const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 599px)" });
    const [tweet, setTweet] = useState(null);
    const { username, tweetId } = useParams();

    useEffect(() => {
        console.log("fetching commemetn.tweet")
        const fetchTweet = () => {
            axios.get(`http://localhost:8000/tweet/gettweet/${tweetId}`,
            {withCredentials: true }
            )
            .then((res) => {
                console.log(res);
                setTweet(res.data.tweet);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        fetchTweet();
    }, [])

    if (!tweet) return <div> Loading... </div>;

    return (
        <div className="d-flex main-container" id="tweet-page">
            
            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar />}
            </div>

            <div className="d-inline-flex flex-column feed">
                {(isTablet || isDesktop) && <Header heading="Tweet" subHeading="" />}
        
                <Tweet tweet={tweet} user={{ name: tweet.name, username: tweet.username }} disableDeleteTweet={true} tweetPage={true} directComment={true} />

                {isMobile && <MobileNavbar />}
            </div>

            <div className={"d-inline-flex flex-column side-panel-container"}>

                {isDesktop && <div className="sticky-top">
                    <Searchbar style={{ width: "100%" }} />
                    <SidePanel />
                </div>} 

            </div>

        </div>
    );
}