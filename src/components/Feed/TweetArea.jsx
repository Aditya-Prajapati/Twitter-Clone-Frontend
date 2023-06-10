import React, { useState } from "react";
import axios from "axios";
import ProfileImage from "../ProfileImage";
import CollectionsIcon from '@mui/icons-material/Collections';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import GeneralButton from "../Buttons/GeneralButton";
import "./TweetArea.css";

export default function TweetArea(props){

    const [tweetContent, setTweetContent] = useState("");

    const postTweet = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/posttweet",
            {
                username: props.user.username,
                tweetContent: tweetContent
            }, 
            { withCredentials: true }
            )
            .then((res) => {
                if (res.status === 200){
                    setTweetContent("");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className={"d-flex tweet-area"}>

            <ProfileImage style={{ margin: "4px 14px 0 0" }} width={52} height={52} />

            <div className="d-flex flex-column" style={{ width: "100%" }}>
                <form onClick={postTweet}>
                    
                    <textarea placeholder="What is happening?!" onChange={(e) => {setTweetContent(e.target.value)}} value={tweetContent} className={"tweet-area-text-area"}></textarea>

                    <div className={"d-flex my-2 align-items-center justify-content-between"}>

                        <div className={"d-flex"}>
                            <a href="#"> <CollectionsIcon className={"ms-1"} fontSize="small" sx={{ color: "#1da1f2" }} /> </a>
                            <a href="#"> <GifBoxIcon className={"ms-3"} fontSize="small" sx={{ color: "#1da1f2" }} /> </a>
                            <a href="#"> <SentimentSatisfiedAltIcon className={"ms-3"} fontSize="small" sx={{ color: "#1da1f2" }} /> </a>
                        </div>

                        <button 
                            className={"tweet-button"}
                            disabled={ !( /\S/.test(tweetContent) ) } 
                            style={{ backgroundColor: `${ !(/\S/.test(tweetContent)) ? "rgb(29, 161, 242, 0.5)" : "rgb(29, 161, 242)" }` }}
                        > 
                            Tweet 
                        </button>
                        
                    </div>

                </form>
            </div>
        </div>
);
}