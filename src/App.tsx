import React from "react";

interface ChatbotProps {
    apiKey: string;
    theme?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ apiKey, theme = "light" }) => {
    return (
        <div
            className={`p-4 rounded-lg ${
                theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-black"
            }`}
        >
            <h1 className="text-xl font-bold">Chatbot</h1>
            <p>API Key: {apiKey}</p>
        </div>
    );
};

export default Chatbot;
