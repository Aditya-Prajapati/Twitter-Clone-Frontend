import React, { useState } from "react";
import "./Tweet.css";
import ProfileImage from "../ProfileImage";
import NameAndId from "../ProfileBox/NameAndId";
import TweetArea from "./TweetArea";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from "axios";

export default function Tweet(props) {

    const [likes, setLikes] = useState(props.tweet.likes);
    const [comments, setComments] = useState(0);
    const [clickedComments, setClickedComments] = useState(false);
    const [commentedBy, setCommentedBy] = useState([]);

    const deleteTweet = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/tweet/deletetweet", 
            {
                tweetId: props.tweet._id
            },
            { withCredentials: true }
            )
            .then((res) => {
                if (res.status == 200){
                    props.setDeleteTweet(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleLike = () => {
        axios.
            post("http://localhost:8000/tweet/liketweet",
            {
                tweetId: props.tweet._id,
                likes: props.tweet.likes
            },
            { withCredentials: true }
            )
            .then((res) => {

                if (res.data.message == "Already liked"){
                    setLikes(res.data.updatedLikes);
                }
                else {
                    setLikes(res.data.updatedLikes);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleComment = () => {
        if (clickedComments){
            setClickedComments(false);
            return;
        }
        else {
            setClickedComments(true);
        }

        axios
            .post("http://localhost:8000/tweet/getcomments",
            {
                tweetId: props.tweet._id
            },
            { withCredentials: true }
            )
            .then((res) => {
                setCommentedBy(res.data.commentedBy);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
                <div className="d-flex">

                    <div className="me-3">
                        <ProfileImage width={46} height={46} />
                    </div>

                    <div className="d-flex flex-column" style={{ width: "100%" }}>

                        <div>
                            {/* Tweet Header */}
                            <div className="d-flex justify-content-between">

                                <NameAndId user={props.user} />
                                <div className="dropdown">

                                    <form onSubmit={deleteTweet}>
                                        <a href="#" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis dropdown-toggle" data-bs-toggle="dropdown"> </a>
                                        <ul className="dropdown-menu text-small">
                                            <li>
                                                <button disabled={props.disableDeleteTweet} className="dropdown-item"> Delete Tweet </button>
                                            </li>
                                        </ul>
                                    </form>

                                </div>
                            </div>

                            {/* Tweet Content */}
                            <p className="card-text my-3"> {props.tweet.content} </p> 

                            {/* Tweet Image */}
                            {/* <div className="tweet-image-bg">
                                <img src="https://github.com/mdo.png" alt="tweet_img" className="tweet-image" />
                            </div> */}

                        </div>

                        {/* Icons */}
                        <div className="d-flex">
                            <a onClick={() => handleComment()} className="card-link ms-1" style={{ cursor: "pointer" }}> 
                                <ModeCommentOutlinedIcon sx={{ color: "rgb(83, 100, 113)", fontSize: "19px" }} /> 
                            </a>
                            <span> {comments} </span>
                            <a onClick={() => handleLike()} className="card-link ms-5" style={{ cursor: "pointer" }}> 
                                <FavoriteBorderOutlinedIcon sx={{ color: "rgb(83, 100, 113)", fontSize: "19px" }} /> 
                            </a>
                            <span> {likes} </span>
                        </div>

                        {/* Comments */}
                        {clickedComments && <TweetArea tweet={props.tweet} user={props.user} text="Tweet your reply!" buttonText="Reply" style={{ border: "0.9px solid rgb(211, 211, 211, 0.3)", marginTop: "10px" }} makeReply={true} />}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}