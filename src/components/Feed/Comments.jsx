import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Tweet.css";
import ProfileImage from "../ProfileImage";
import NameAndId from "../ProfileBox/NameAndId";
import TweetArea from "./TweetArea";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from "axios";
import Tweet from "./Tweet";

export default function Comments(props) {

    const [likes, setLikes] = useState(props.tweet.likes);
    const [comments, setComments] = useState(0);
    const [clickedComments, setClickedComments] = useState(false);
    const [commentedBy, setCommentedBy] = useState(null);

    useEffect(() => {
        const getComments = () => {
            axios
                .post("http://localhost:8000/tweet/getcomments",
                {
                    tweetId: props.tweet._id // might be the commentId, bcz comment is treated as tweet
                },
                { withCredentials: true }
                )
                .then((res) => {
                    console.log(res.data.comments);
                    setCommentedBy(res.data.comments.reverse());
                    props.setNewComment(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getComments();
    }, [props.newComment])

    const handleClick = (commentBy, user) => {
        props.setCommentClicked([...props.commentClicked, {commentBy, user}]);
        axios
            .post("http://localhost:8000/tweet/getcomments",
            {
                tweetId: commentBy._id // might be the commentId, bcz comment is treated as tweet
            },
            { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data.comments);
                setCommentedBy(res.data.comments.reverse());
                props.setNewComment(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    if (commentedBy == null) return <div> Loading... </div>;

    return (
        <>
            {/* Tweet component is used for comments too */}
            {commentedBy.map((commentBy, index) => {
                let user = {
                    name: commentBy.name,
                    username: commentBy.username
                }
                
                return (
                    <div onClick={() => handleClick(commentBy, user)} >
                        <Tweet key={index} tweet={commentBy} user={user} isComment={true} />
                    </div>
                )
            })}
        </>
    )
}