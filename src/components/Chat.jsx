const Chat = () => {
    return(
        <div className="flex justify-center items-center flex-col">
        <div className="w-6/12 border h-[70vh] p-2 rounded-lg overflow-y-scroll">
            <div className="chat chat-start">
                <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    />
                </div>
                </div>
                <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50"></time>
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
        </div>
        <div className="w-6/12 flex gap-1 mt-1">
            <input className="border-1 flex-1 rounded-md" type="text" />
            <button className="btn-primary btn">send</button>
        </div>
</div>
)
}

export default Chat;