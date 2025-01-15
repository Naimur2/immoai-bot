import React from "react";
import "../index.css";
interface ChatbotProps {
    apiKey: string;
    theme?: string;
}
declare const Chatbot: React.FC<ChatbotProps>;
export default Chatbot;
