import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "../Pages/Home";
import Explore from "../Pages/Explore";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

export default function App() {

    const [user, setUser] = useState(null);
    const [signedUpMsg, setSignedUpMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getUser = async () => {
            
            try {
                const response = await axios.get(
                    "http://localhost:8000/auth/login/success",
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Credentials": true,
                        },
                    }
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
        <Routes>
            <Route path="/" element={<Login signedUpMsg={signedUpMsg} setUser={setUser} />} />
            <Route path="/signup" element={<Signup setSignedUpMsg={setSignedUpMsg} />} />
            <Route
                path="/home"
                element={user ? <Home /> : <Navigate to="/" replace />}
            />
            <Route
                path="/explore"
                element={user ? <Explore /> : <Navigate to="/" replace />}
            />
            <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
