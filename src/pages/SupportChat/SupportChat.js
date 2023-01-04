import { Chat } from "@mui/icons-material";
import React from "react";
import "./SupportChat.css";
import Sidebar from "../../components/SupportChatComponents/Sidebar";
export default function SupportChat() {
    return(
        <div className='support'>
            <div className="container">
                <Sidebar className='sidebar'/>
                <Chat className="chat"/>
            </div>
        </div>
    );
}