import React from "react";
import ChatBot from "../components/ChatBot";
import useChatSettings from "../context/useChatSettings";

const ChatbotPage = () => {
  const { isLoading, data, sendMessage, messages,isChatLoading } = useChatSettings();

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
            backgroundColor={data?.assistant_styles?.bot_bubble_color}
            image={data?.assistant_styles?.chat_widget_image}
            imageBackgroundColor={data?.assistant_styles?.bot_avatar_color}
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
          />
        ))}
        {isChatLoading && <span className="chat-loader"></span>}
      </ChatBot.Content>
      <ChatBot.ToolBar onSend={sendMessage} />
    </>
  );
};

export default ChatbotPage;
