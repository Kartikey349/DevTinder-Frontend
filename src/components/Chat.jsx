import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createServerConnection } from "../utils/serverConnection";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {

    const {targetId} = useParams();
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const user = useSelector((store) => store.user)
    const [onlineStatus, setOnlineStatus] = useState("")
    const loggedInId = user?._id


    useEffect(() => {
        fetchChatMessages()
    })

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetId, {
            withCredentials: true
        },[])


        const chatMessages = (chat?.data?.messages).map((msg) => {
            return {
                firstName: msg.senderId.firstName, 
                lastName: msg.senderId.lastName,
                text: msg.text
            }
        })
        setMessage(chatMessages)
    }

    useEffect(() => {
        if(!loggedInId) return;
        const socket = createServerConnection();
        socket.emit("joinChat", {loggedInId, targetId})

        socket.emit("online", {loggedInId})

        socket.emit("checkOnline", {targetId})

        socket.on("result", ({targetId, status}) => {
            setOnlineStatus(status)
        })

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
        <div className="fixed top-8 left-[50%] rounded-lg p-1 bg-white text-black">{onlineStatus? "online" : "offline"}</div>
        {message && message.map((msg, index) => {
            return (
                <div key={index} className={`chat ${msg?.firstName === user.firstName ? "chat-end" : "chat-start"} `}>
                <div className="chat-header">
                {msg?.firstName} {msg.lastName}
                <time className="text-xs opacity-50"></time>
                </div>
                <div className={`chat-bubble ${msg?.firstName === user.firstName ? "bg-red-300" : "bg-green-400"} `}>{msg?.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
            )
        })}

        </div>
        <form onSubmit={(e) => {
            e.preventDefault()
            setNewMessage("")
        }} className=" w-full absolute bottom-20 md:w-6/12 flex gap-1 mt-1 p-4">
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="border-1 flex-1 rounded-md px-2" type="text" />
            <button className="btn-primary btn"
            onClick={sendMessage}
            >send</button>
        </form>
</div>
)
}

export default Chat;