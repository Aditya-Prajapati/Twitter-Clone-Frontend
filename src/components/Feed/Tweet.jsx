import React, { useEffect, useState } from "react";
import "./Tweet.css";
import ProfileImage from "../ProfileImage";
import NameAndId from "../ProfileBox/NameAndId";
import TweetArea from "./TweetArea";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import Comments from "./Comments";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const deleteTweet = (e, tweet, setDeleteTweet) => {
    e.preventDefault();

    axios
        .post("https://twitter-clone-backend-in-progress.vercel.app/tweet/deTletetweet",
            {
                tweetId: tweet._id
            },
            { withCredentials: true }
        )
        .then((res) => {
            if (res.status == 200) {
                setDeleteTweet(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

const handleLike = (tweet, setLikes, isComment, liked, setLiked) => {
    
    axios.
        post("https://twitter-clone-backend-in-progress.vercel.app/tweet/liketweet",
            {
                tweetId: tweet._id,
                isComment: isComment,
                likes: tweet.likes
            },
            { withCredentials: true }
        )
        .then((res) => {
            if (res.data.message == "Already liked") {
                setLikes(res.data.updatedLikes);
            }
            else {
                setLikes(res.data.updatedLikes);
            }
            setLiked(!liked);
        })
        .catch((err) => {
            console.log(err);
        })
}

const handleComment = (tweet, setClickedCommentButton, clickedCommentButton, setCommentedBy, isComment) => {

    if (clickedCommentButton) {
        setClickedCommentButton(false);
        return;
    }
    else {
        setClickedCommentButton(true);
    }

    axios
        .post("https://twitter-clone-backend-in-progress.vercel.app/tweet/getcomments",
            {
                tweetId: tweet._id
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

export default function Tweet(props) {

    const [likes, setLikes] = useState(props.tweet.likes);
    const [liked, setLiked] = useState(props.liked);
    const [comments, setComments] = useState(props.tweet.comments);
    const [clickedCommentButton, setClickedCommentButton] = useState(false);
    const [commentButtonHover, setcommentButtonHover] = useState(false);
    const [likesButtonHover, setlikesButtonHover] = useState(false);
    const [commentedBy, setCommentedBy] = useState([]);
    const [commentClicked, setCommentClicked] = useState([]);

    const customStyle = {
        ...props.style,
        borderBottom: props.threaded ? "none" : ""
    }

    const handleCommentButtonHover = () => {
        setcommentButtonHover(!commentButtonHover);
    }

    const handleLikesButtonHover = () => {
        setlikesButtonHover(!likesButtonHover);
    }

    return (
        <>
            <div className="card" style={customStyle}>
                <div className="card-body">
                    <div className="d-flex flex-column">
                        <Link to={`/${props.tweet.username}/${props.tweet._id}/${props.isComment || false}`} style={{ textDecoration: "none", color: "black" }}>
                            <div className="d-flex">

                                <div className="me-3">
                                    <ProfileImage width={46} height={46} user={props.user} />

                                    {(clickedCommentButton || props.threaded) && <div className="comment-line"></div>}
                                </div>

                                <div className="d-flex flex-column" style={{ width: "100%" }}>

                                    <div>
                                        {/* Tweet Header */}
                                        <div className="d-flex justify-content-between">

                                            <NameAndId user={props.user} />
                                            <div className="dropdown">

                                                <form onSubmit={(e) => deleteTweet(e, props.tweet, props.setDeleteTweet)}>
                                                    <div href="#" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis dropdown-toggle" data-bs-toggle="dropdown"> </div>
                                                    <ul className="dropdown-menu text-small">
                                                        <li>
                                                            <button onClick={(e) => e.stopPropagation()} disabled={props.disableDeleteTweet} className="dropdown-item"> Delete Tweet </button>
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
                                        <div onMouseEnter={handleCommentButtonHover} onMouseLeave={handleCommentButtonHover} onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleComment(props.tweet, setClickedCommentButton, clickedCommentButton, setCommentedBy, props.isComment) }} className="d-flex align-items-center card-link ms-1 options" style={{ cursor: "pointer" }}>
                                            <ModeCommentOutlinedIcon sx={{ color: (clickedCommentButton || commentButtonHover) ? "#1DA1F2" : "rgb(83, 100, 113)", fontSize: "18px" }} />
                                            <span style={{ color: (clickedCommentButton || commentButtonHover) ? "#1DA1F2" : "rgb(83, 100, 113)" }}> {comments} </span>
                                        </div>
                                        <div onMouseEnter={handleLikesButtonHover} onMouseLeave={handleLikesButtonHover} onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleLike(props.tweet, setLikes, props.isComment, liked, setLiked) }} className="d-flex align-items-center card-link ms-5 options" style={{ cursor: "pointer" }}>
                                            {liked ? <FavoriteIcon sx={{ color: "rgb(249, 24, 128)", fontSize: "18px" }} /> : <FavoriteBorderOutlinedIcon sx={{ color: likesButtonHover ? "rgb(249, 24, 128)" : "rgb(83, 100, 113)", fontSize: "18px" }} />}
                                            <span style={{ color: (liked || likesButtonHover) ? "rgb(249, 24, 128)" : "rgb(83, 100, 113)" }}> {likes} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Link>
                    </div>
                </div>
                    {clickedCommentButton && <TweetArea tweet={props.tweet} user={props.currentUser || props.user} text="Tweet your reply!" buttonText="Reply" style={{ marginTop: "14px", padding: "16px", border: "none", backgroundColor: "white" }} makeReply={true} comments={comments} setNewComment={props.setNewComment} setComments={setComments} isComment={props.isComment} />}
            </div>
        </>
    );
}