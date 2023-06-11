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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_lSNw7Ee7u6J7SWu5Ku6BP6H3kMcOI9TFw&usqp=CAU"
            alt="profile_image"
            style={imageStyle}
        />
    );
}