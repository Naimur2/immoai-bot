import React from "react";
import ChatBot from "../components/ChatBot";
import useChatSettings from "../context/useChatSettings";
import { Media } from "@/components/ChatBot/components/ChatToolbar";

const ChatbotPage = () => {
    const { isLoading, data, sendMessage: originalSendMessage, messages, isChatLoading } =
        useChatSettings();

    const sendMessage = (data: { message: string; media: false | Media, file_id : any }) => {

        if(data.message.trim() == '') return

        const messageObject =  {
            message : data.message,
            media : data.file_id
        }
        originalSendMessage( JSON.stringify(messageObject), data.media );
    };

    if (isLoading || !data) {
        return null;
    }

    return (
        <>
            <ChatBot.Content>
                {messages.length === 0 ? (
                    <ChatBot.Bubble
                        type="bot"
                        text={
                            data?.assistant_styles?.text_to_appear ||
                            "Hello, how can I help you today?"
                        }
                        color={data?.assistant_styles?.bot_bubble_text}
                        backgroundColor={
                            data?.assistant_styles?.bot_bubble_color
                        }
                        image={data?.assistant_styles?.chat_widget_image}
                        imageBackgroundColor={
                            data?.assistant_styles?.bot_avatar_color
                        }
                    />
                ) : null}

                {messages.map((message, index) => (
                    <ChatBot.Bubble
                        key={index}
                        type={message.type}
                        text={message.message}
                        color={
                            message.type === "user"
                                ? data?.assistant_styles?.user_bubble_text
                                : data?.assistant_styles?.bot_bubble_text
                        }
                        backgroundColor={
                            message.type === "user"
                                ? data?.assistant_styles?.bubble_color_user
                                : data?.assistant_styles?.bot_bubble_color
                        }
                        image={
                            message.type === "bot"
                                ? data?.assistant_general?.bot_image
                                : undefined
                        }
                    />
                ))}
                {isChatLoading && <span className="chat-loader"></span>}
            </ChatBot.Content>
            <ChatBot.ToolBar onSend={sendMessage} isDisabled={isChatLoading} />
        </>
    );
};

export default ChatbotPage;
