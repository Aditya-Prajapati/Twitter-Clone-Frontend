import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        const getComments = () => {
            axios
                .post("http://localhost:8000/tweet/getcomments",
                {
                    tweetId: props.tweet._id
                },
                { withCredentials: true }
                )
                .then((res) => {
                    setCommentedBy(res.data.commentedBy.reverse());
                    props.setNewComment(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getComments();
    }, [props.newComment])

    if (commentedBy == null) return <div> Loading... </div>;

    return (
        <>
            {/* Tweet component is used for comments */}
            {commentedBy.map((commentBy, index) => {
                let user = {
                    name: commentBy.name,
                    username: commentBy.username
                }
                return <Tweet key={index} tweet={commentBy} user={user} />
            })}
        </>
    )
}