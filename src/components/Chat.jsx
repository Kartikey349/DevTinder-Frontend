import { useEffect, useRef, useState } from "react";
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
    const ref = useRef(null)

    useEffect(() => {
        ref.current.scrollIntoView({
            behaviour: "smooth"
        })
    }, [message])


    useEffect(() => {
        fetchChatMessages()
    }, [targetId])

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


    const clearMessage= async () => {
        const confirmed = window.confirm("Are you sure you want to delete this chat permanently?");
  
        if (!confirmed) return;
        
        const res = await axios.patch(BASE_URL + "/chat/" + targetId + "/delete", {} ,{
            withCredentials: true
        })

        setMessage(res.data)
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
            <div className="my-2">
                <button onClick={clearMessage} className="btn btn-primary">clear</button>
                <button className="">{onlineStatus? "🟢" : "🔴"}</button>
            </div>
        <div className=" w-full md:w-6/12 border h-[65vh] p-2 rounded-lg overflow-y-scroll">
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
            <div ref={ref}></div>

        </div>
        <form onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
            setNewMessage("")
        }} className=" w-full md:w-6/12 flex gap-1 mt-1 p-4">
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="border-1 flex-1 rounded-md px-2" type="text" />
            <button className="btn-primary btn"
            >send</button>
        </form>
</div>
)
}

export default Chat;