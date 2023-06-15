import React from "react";

export default function NameAndId(props){

    if (!props.user) {
        return <div> Loading... </div>; 
    }

    return (
        <div className="d-inline-flex flex-column name-and-id">

            <p className="m-0" style={{ fontWeight: "500" }}> {props.user.name} </p> 
            <div href="#" className="anchor"><span> {props.user.username} </span></div>
            
        </div>
    );
}