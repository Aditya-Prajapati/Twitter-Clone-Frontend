import React from "react";
import ProfileImage from "../ProfileImage";
import CollectionsIcon from '@mui/icons-material/Collections';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import GeneralButton from "../Buttons/GeneralButton";
import "./TweetArea.css";

export default function TweetArea(){

    return (
        <div className={"d-flex tweet-area"}>

            <ProfileImage style={{ margin: "4px 14px 0 0" }} width={52} height={52} />

            <div className="d-flex flex-column" style={{ width: "100%" }}>
                <form action="/" method="post">
                    
                    <textarea placeholder="What is happening?!" className={"tweet-area-text-area"}></textarea>

                    <div className={"d-flex my-2 align-items-center justify-content-between"}>

                        <div className={"d-flex"}>
                            <a href="#"> <CollectionsIcon className={"ms-1"} fontSize="small" sx={{ color: "#1da1f2" }} /> </a>
                            <a href="#"> <GifBoxIcon className={"ms-3"} fontSize="small" sx={{ color: "#1da1f2" }} /> </a>
                            <a href="#"> <SentimentSatisfiedAltIcon className={"ms-3"} fontSize="small" sx={{ color: "#1da1f2" }} /> </a>
                        </div>

                        <GeneralButton type="submit" bgc="#1da1f2" color="white" text="Tweet" />
                        
                    </div>

                </form>
            </div>
        </div>
);
}