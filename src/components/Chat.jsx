import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createServerConnection } from "../utils/serverConnection";
import { useParams } from "react-router-dom";

const Chat = () => {

    const {targetId} = useParams();
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const user = useSelector((store) => store.user)
    const loggedInId = user?._id


    const date = new Date;
    const hour = date.getHours();
    const minutes = date.getMinutes();

    useEffect(() => {
        if(!loggedInId) return;
        const socket = createServerConnection();
        socket.emit("joinChat", {loggedInId, targetId})


        socket.on("receivedMessage", ({firstName, text, senderId}) => {
            setMessage((message) => [...message, {firstName, text, senderId}])
        })


        return () => {
            socket.disconnect()
        }

    },[loggedInId, targetId])

    
    const sendMessage = () => {
        const socket = createServerConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            targetId,
            senderId: loggedInId,
            text: newMessage
        })
    }


    return(
        <div className="flex justify-center items-center flex-col">
        <div className=" w-full md:w-6/12 md:border h-[70vh] p-2 rounded-lg overflow-y-scroll">
        {message && message.map((msg, index) => {
            return (
                <div key={index} className={`chat ${msg?.senderId === loggedInId ? "chat-end" : "chat-start"} `}>
                <div className="chat-header">
                {msg?.firstName}
                <time className="text-xs opacity-50">{hour}:{minutes}</time>
                </div>
                <div className={`chat-bubble ${msg?.senderId === loggedInId ? "bg-red-300" : "bg-green-400"} `}>{msg?.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
            )
        })}

        </div>
        <div className=" w-full absolute bottom-20 md:w-6/12 flex gap-1 mt-1 p-4">
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="border-1 flex-1 rounded-md" type="text" />
            <button className="btn-primary btn"
            onClick={sendMessage}
            >send</button>
        </div>
</div>
)
}

export default Chat;