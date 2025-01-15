import React from "react";
import "../index.css";

interface ChatbotProps {
    apiKey: string;
    theme?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ apiKey }) => {
    return (
        <div
            className={
                "fixed bottom-10 right-10 p-4 shadow-md rounded-md bg-slate-300 w-[clamp(10rem,60vw,40rem)] open-chat"
            }
        >
            <h1 className="text-xl font-bold">Chatbot</h1>
            <p>API Key: {apiKey}</p>
        </div>
    );
};

export default Chatbot;
