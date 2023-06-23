import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import axios from "axios";
import Home from "../Pages/Home";
import Explore from "../Pages/Explore";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import TweetPage from "../Pages/TweetPage";
import FollowPage from "../Pages/FollowPage";

export default function App() {

    const [user, setUser] = useState(null);
    const [signedUpMsg, setSignedUpMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {

            try {
                const response = await axios.get(
                    "https://twitterclonebackendv1.vercel.app/auth/login/success",
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setUser(response.data.user);
                }
                else {
                    throw new Error("Login failed.");
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setSignedUpMsg("");
                setIsLoading(false);
            }
        };

        getUser();
    }, []);

    if (isLoading) {
        return <div> Loading... </div>;
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Login signedUpMsg={signedUpMsg} setUser={setUser} />} />
                <Route path="/signup" element={<Signup setSignedUpMsg={setSignedUpMsg} />} />
                <Route
                    exact
                    path="/home"
                    element={user ? <Home user={user} /> : <Navigate to="/" replace />}
                />
                <Route
                    path=":username/:tweetId/:isComment" element={user ? <TweetPage user={user} /> : <Navigate to="/" replace />}
                />
                <Route
                    path="/explore"
                    element={user ? <Explore user={user} /> : <Navigate to="/" replace />}
                />
                <Route
                    exact
                    path="/profile"
                    element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/" replace />}
                />
                <Route
                    path="/profile/:username/:path" element={user ? <FollowPage user={user} /> : <Navigate to="/" replace />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Analytics />
        </>
    );
}
