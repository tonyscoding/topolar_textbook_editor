import React, {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {serverTextbookOpenState} from "@/utils/States";

const ServerTextbookSidebar = () => {
    const [serverTextbookOpen, setServerTextbookOpen] = useRecoilState(serverTextbookOpenState);

    useEffect(() => {
        console.log(serverTextbookOpen);
    })
    return (
        <div className={"server-textbook-sidebar" + (serverTextbookOpen? "" : " closed")}>
            <span className="material-icons-outlined textbook-sidebar-toggle" onClick={()=>{setServerTextbookOpen(false)}}>
            close
            </span>

            {/*<TextbookBrowser*/}
            {/*    textbookDict = {TextbookIndexLoading? null : TextbookIndex}*/}
            {/*    textbookOnClickCallback = {textbookOnClickCallback? handleTextbookOnClick : null}*/}
            {/*    topOrderIndicator = {calculateTopIndicator()}*/}
            {/*    showTitle={true}*/}
            {/*    textbookCompleteCallback = {textbookCompleteCallback}*/}
            {/*    currentTextbook={currentTextbook || (lastTextbook)}*/}
            {/*    onEditFunction={onEditFunction? handleOnEdit:null}*/}
            {/*    courseTitle={TextbookIndex?CONSTANT_LANGUAGE_PARSE_TO_CLASSNAME[TextbookIndex.language]:null}*/}
            {/*/>*/}
        </div>
    );
};

export default ServerTextbookSidebar;
