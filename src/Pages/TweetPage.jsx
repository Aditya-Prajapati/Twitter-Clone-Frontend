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
    const [id, setId] = useState(tweetId); // could be tweet id or commment id

    useEffect(() => {
        const fetchTweet = (id) => {
            axios.get(`http://localhost:8000/tweet/gettweet/${id}`,
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
            axios.get(`http://localhost:8000/tweet/getcomments/${id}`, // comment is treated as tweet
                { withCredentials: true }
            )
                .then((res) => {
                    setCommentClicked(res.data.comments.reverse());
                    fetchTweet(res.data.comments[1] ? res.data.comments[1].commentId : id);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchComments();
    }, [])

    if (!tweet || !commentClicked) return <div> Loading... </div>;

    return (
        <div className="d-flex main-container" id="tweet-page">

            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar />}
            </div>

            <div className="d-inline-flex flex-column feed">
                {(isTablet || isDesktop) && <Header heading="Tweet" subHeading="" />}

                <Tweet tweet={tweet} user={{ name: tweet.name, username: tweet.username }} disableDeleteTweet={true} directComment={true} tweetPage={true} style = {{ cursor: "auto", backgroundColor: "white" }} />
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
                                isComment={false}
                                style = {{ cursor: "auto", backgroundColor: "white" }}
                            />
                        );
                    })
                }
                <Header heading="Comments" subHeading="" />
                <TweetArea tweet={commentClicked.at(-1) ? commentClicked.at(-1) : tweet} user={props.user} text="Tweet your reply!" buttonText="Reply" style={{ marginTop: "10px" }} makeReply={true} setNewComment={setNewComment} directComment={props.directComment} />
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