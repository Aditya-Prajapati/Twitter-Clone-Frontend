import React from "react";

export default function ProfileImage(props){

    const imageStyle = {
        width: `${props.width}px`,
        height: `${props.height}px`,
        ...props.style
    };

    return (
        <img
            className={"rounded-circle"}
            src="https://github.com/mdo.png"
            alt="profile_image"
            style={imageStyle}
        />
    );
}