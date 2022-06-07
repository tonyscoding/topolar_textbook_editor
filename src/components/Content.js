import React, { useEffect, useState } from "react";
// import { IS_ELECTRON } from '../App';

const IS_ELECTRON = true;

const Content = ({ children, displayNone, path }) => {

    const [contentPath, setContentPath] = useState();
    useEffect(()=>{
        if (path) setContentPath(path)
        else setContentPath(children.props.location.pathname)
    })

    return (
        <div className={displayNone ? "dnm" : contentPath==="/student/classroom" && IS_ELECTRON ? "content-student-classroom" : "content"}>{children}</div>
    )
} 

export default Content;
