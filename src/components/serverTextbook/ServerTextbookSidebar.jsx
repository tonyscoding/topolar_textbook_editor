import React, {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {serverTextbookOpenState} from "@/utils/States";
import ServerTextbookBrowser from "@/components/serverTextbook/ServerTextbookBrowser";
import {FiX} from "react-icons/fi";

const ServerTextbookSidebar = () => {
    const [serverTextbookOpen, setServerTextbookOpen] = useRecoilState(serverTextbookOpenState);

    return (
        <div className={"server-textbook-sidebar" + (serverTextbookOpen? "" : " closed")}>
            <span className="material-icons-outlined textbook-sidebar-toggle" onClick={()=>{setServerTextbookOpen(false)}}>
            <FiX size={25} />
            </span>

            <ServerTextbookBrowser />
        </div>
    );
};

export default ServerTextbookSidebar;
