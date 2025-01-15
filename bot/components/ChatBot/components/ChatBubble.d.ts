import React from "react";
type ChatBubbleBotProps = {
    text: string;
    type?: "bot" | "user";
    backgroundColor?: string;
    color?: string;
    image?: string;
    imageBackgroundColor?: string;
};
export default function ChatBubble({ text, type, backgroundColor, color, image, imageBackgroundColor, }: ChatBubbleBotProps): React.JSX.Element;
export {};
