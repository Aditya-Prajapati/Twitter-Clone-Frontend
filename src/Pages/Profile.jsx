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

    const [isLoading, setIsLoading] = useState(true);
    const [tweets, setTweets] = useState(null);

    useEffect(() => {
        const getTweets = async () => {
            try{
                await axios.
                    get("http://localhost:8000/gettweets",
                    { withCredentials: true }
                    )
                    .then((res) => {
                        if (res.status === 200){
                            setTweets(res.data.tweets.reverse());
                        }
                    })
            }
            catch{(err) => {
                console.log(err);
            }}
            finally{
                setIsLoading(false);
            }
        }

        getTweets();
    }, [])

    if (isLoading){
        return <div> Loading... </div>;
    }

    return (
        <div className="d-flex main-container" id="profile">
            
            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar />}
            </div>

            <div className="d-inline-flex flex-column feed">
                {(isTablet || isDesktop) && <Header heading="Profile" subHeading="" />}
                <ProfileBox user={props.user} />
                {/* <div className="header" style={{ height: "30px" }}>
                    <p> <strong> Your tweets </strong> </p>
                </div> */}
                <Header heading="Your tweets" />

                {tweets.map((tweet, index) => {
                    return <Tweet key={index} tweetContent={tweet.content} user={props.user} />;
                })}
                {isMobile && <MobileNavbar />}
            </div>

            <div className={"d-inline-flex flex-column side-panel-container"}>

                {isDesktop && <div className="sticky-top">
                    <Searchbar style={{ width: "96%" }} />
                    <SidePanel user={props.user} />
                </div>} 

            </div>

        </div>
    );
}