
import React from "react";
import "./SupportChat.css";
import Sidebar from "../../components/SupportChatComponents/Sidebar";
import Chat from "../../components/SupportChatComponents/Chat"
export default function SupportChat() {
    return(
        <div className='support'>
            <div className="container">
                {/*<Sidebar className='sidebar'/>*/}
                <Chat className="chat"/>
            </div>
        </div>
    );
}