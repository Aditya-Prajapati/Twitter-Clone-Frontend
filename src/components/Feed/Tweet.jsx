import React, { useState } from "react";
import "./Tweet.css";
import ProfileImage from "../ProfileImage";
import NameAndId from "../ProfileBox/NameAndId";
import TweetArea from "./TweetArea";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from "axios";
import Comments from "./Comments";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const deleteTweet = (e, tweet, setDeleteTweet) => {
    e.preventDefault();

    axios
        .post("http://localhost:8000/tweet/deletetweet",
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

const handleLike = (tweet, setLikes, isComment) => {
    axios.
        post("http://localhost:8000/tweet/liketweet",
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
        })
        .catch((err) => {
            console.log(err);
        })
}

const handleComment = (tweet, setClickedCommentButton, clickedCommentButton, setCommentedBy) => {
    if (clickedCommentButton) {
        setClickedCommentButton(false);
        return;
    }
    else {
        setClickedCommentButton(true);
    }

    axios
        .post("http://localhost:8000/tweet/getcomments",
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
    const [comments, setComments] = useState(0);
    const [newComment, setNewComment] = useState(false);
    const [clickedCommentButton, setClickedCommentButton] = useState(false);
    const [commentClicked, setCommentClicked] = useState([]);
    const [commentedBy, setCommentedBy] = useState([]);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column">
                        <div className="d-flex">

                            <div className="me-3">
                                <ProfileImage width={46} height={46} />
                                {(props.tweetPage || clickedCommentButton) && <div className="comment-line"></div>}
                            </div>

                            <div className="d-flex flex-column" style={{ width: "100%" }}>

                                <div>
                                    <Link to={!props.isComment ? `/${props.tweet.username}/${props.tweet._id}` : `#` } style={{ textDecoration: "none", color: "black" }}>
                                        {/* Tweet Header */}
                                        <div className="d-flex justify-content-between">

                                            <NameAndId user={props.user} />
                                            <div className="dropdown">

                                                <form onSubmit={(e) => deleteTweet(e, props.tweet, props.setDeleteTweet)}>
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

                                    </Link>
                                </div>

                                {/* Icons */}
                                <div className="d-flex">
                                    <a onClick={() => handleComment(props.tweet, setClickedCommentButton, clickedCommentButton, setCommentedBy)} className="card-link ms-1 options" style={{ cursor: "pointer" }}>
                                        <ModeCommentOutlinedIcon sx={{ color: "rgb(83, 100, 113)", fontSize: "19px" }} />
                                    </a>
                                    <span> {comments} </span>
                                    <a onClick={() => handleLike(props.tweet, setLikes, props.isComment)} className="card-link ms-5 options" style={{ cursor: "pointer" }}>
                                        <FavoriteBorderOutlinedIcon sx={{ color: "rgb(83, 100, 113)", fontSize: "19px" }} />
                                    </a>
                                    <span> {likes} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments */}
                {commentClicked.length != 0  && 
                    commentClicked.map((comment, index) => {
                        return <Tweet key={index} tweet={comment.commentBy} user={comment.user} isComment={true} directComment={false} />
                    })
                }
                {(props.tweetPage || clickedCommentButton) && <TweetArea tweet={commentClicked.at(-1) ? commentClicked.at(-1).commentBy : props.tweet} user={props.user} text="Tweet your reply!" buttonText="Reply" style={{ border: "none", marginTop: "10px" }} makeReply={true} setNewComment={setNewComment} directComment={props.directComment} />}
            </div>
            {props.tweetPage && <Header heading="Comments" subHeading="" />}
            {props.tweetPage && <Comments user={props.user} tweet={commentClicked.at(-1) ? commentClicked.at(-1).commentBy : props.tweet} newComment={newComment} setNewComment={setNewComment} directComment={props.directComment} commentClicked={commentClicked} setCommentClicked={setCommentClicked} />}
        </>
    );
}