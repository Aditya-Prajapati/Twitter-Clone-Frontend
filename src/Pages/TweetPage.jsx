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
import Comments from "../components/Feed/Comments";
import TweetArea from "../components/Feed/TweetArea";

export default function TweetPage(props) {

    const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 599px)" });
    const [tweet, setTweet] = useState(null);
    const { username, tweetId, isComment } = useParams();
    const [newComment, setNewComment] = useState(false);
    const [commentClicked, setCommentClicked] = useState(null);

    useEffect(() => {
        setCommentClicked(null);
        setTweet(null);

        const fetchTweet = (tweetId) => {
            axios.get(`http://localhost:8000/tweet/gettweet/${tweetId}`,
                { withCredentials: true }
            )
                .then((res) => {
                    console.log(res.data.tweet)
                    setTweet(res.data.tweet);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        const fetchComments = () => {
            axios.get(`http://localhost:8000/tweet/getcomments/${tweetId}`, // comment is treated as tweet
                { withCredentials: true }
            )
                .then((res) => {
                    setCommentClicked(res.data.comments.reverse());
                    fetchTweet(res.data.comments[1] ? res.data.comments[1].commentId : tweetId);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchComments();
    }, [tweetId, newComment])

    if (!tweet || !commentClicked) return <div> Loading... </div>;
    console.log(commentClicked)

    return (
        <div className="d-flex main-container" id="tweet-page">

            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar />}
            </div>

            <div className="d-inline-flex flex-column feed">
                {(isTablet || isDesktop) && <Header heading="Tweet" subHeading="" />}

                <Tweet tweet={tweet} user={{ name: tweet.name, username: tweet.username }} disableDeleteTweet={true} directComment={true} tweetPage={true} setNewComment={setNewComment} />
                {commentClicked
                    .filter((comment) => comment !== null)
                    .map((comment, index) => {
                        let user = {
                            username: comment.username,
                            name: comment.name
                        };
                        return (
                            <Tweet
                                key={index}
                                tweet={comment}
                                user={user}
                                newComment={newComment}
                                setNewComment={setNewComment}
                                isComment={true}
                            />
                        );
                    })
                }
                <Header heading="Comments" subHeading="" />
                <TweetArea tweet={commentClicked.at(-1) ? commentClicked.at(-1) : tweet} user={props.user} text="Tweet your reply!" buttonText="Reply" style={{ marginTop: "10px" }} makeReply={true} setNewComment={setNewComment} directComment={props.directComment} comments={commentClicked.at(-1) ? commentClicked.at(-1).comments : tweet.comments} isComment={commentClicked.at(-1) ? true : false} />
                <Comments user={props.user} tweet={commentClicked.at(-1) ? commentClicked.at(-1) : tweet} newComment={newComment} setNewComment={setNewComment} directComment={props.directComment} commentClicked={commentClicked} setCommentClicked={setCommentClicked} />

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