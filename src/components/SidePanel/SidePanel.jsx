import React, { useEffect, useState } from "react";
import SidePanelItem from "./SidePanelItem";
import "./SidePanel.css";
import axios from "axios";

export default function SidePanel(props){

    const [randomUsers, setRandomUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let getRandomUsers = () => {
            axios
                .get("http://localhost:8000/getusers", {
                    withCredentials: true,
                    params: { users: "random" }
                }
                )
                .then((res) => {
                    setRandomUsers((res.data.randomUsers.length == 0) ? null : res.data.randomUsers);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getRandomUsers();
    }, [])

    if (isLoading){
        return <div> Loading... </div>;
    }

    return (  
        randomUsers && <div className={"d-inline-flex bgc-white side-panel " + props.classNames}>

            <ul className="list-group" >
                <h5 className="ms-1 p-4 pb-2">Who to follow</h5>

                {randomUsers.map((randomUser, index) => {
                    return <SidePanelItem key={index} user={props.user} setUser={props.setUser} followUpdated={props.followUpdated} setFollowUpdated={props.setFollowUpdated} randomUser={randomUser} />
                })}

            </ul>
        </div>
    );
}