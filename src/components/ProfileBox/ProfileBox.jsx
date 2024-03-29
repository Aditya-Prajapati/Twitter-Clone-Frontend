import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NameAndId from "./NameAndId";
import EditProfileButton from "../Buttons/EditProfileButton";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ProfileImage from "../ProfileImage";
import "./ProfileBox.css";
import axios from "axios";

const getUpdatedUser = (updatedUser) => {
    axios
        .get("https://twitterclonebackendv1.vercel.app/getuser",
        { withCredentials: true }
        )
        .then((res) => {
            updatedUser(res.data.user)
        })
        .catch((err) => {
            console.log(err);
        })
}

export default function ProfileBox(props){

    const [updatedUser, setUpdatedUser] = useState(null);

    useEffect(() => {
        getUpdatedUser(setUpdatedUser);
    }, [props.followUpdated])

    if (!updatedUser) return <div> Loading... </div>;

    return (
        <div>

            {/* Cover Image */}
            <div className="profile-box-bg">
                <img src=""></img> {/* alt="cover_photo" */}
            </div>

            <div className={"profile-box"}>

                <div className="d-flex align-items-center justify-content-center profile-img-container">
                    <ProfileImage user={props.user} width={133} height={133} />
                </div>

                <div className="d-flex my-4 justify-content-end">
                    {/* <EditProfileButton /> */}
                </div>

                <NameAndId user={props.user} profileBox={true} />  

                {/* Information */}
                <div className="profile-box-info">
                    <p><CalendarMonthIcon sx={{ fontSize: "16px" }} style={{ verticalAlign: "center" }} /> Joined {props.user.joined} </p>  
                    <p>
                        <Link to={`${props.user.username}/following`}> <strong> {updatedUser.follows.length} </strong> Following </Link>
                        &nbsp;&nbsp;
                        <Link to={`${props.user.username}/followers`}> <strong> {updatedUser.followedBy.length} </strong> Followers  </Link>
                    </p> 
                </div>

            </div>

        </div>
    );
}