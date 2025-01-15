import React from "react";
import useChatSettings from "../../context/useChatSettings";
import ChatBot from "../ChatBot";


const ChatbotPage = () => {
  const { isLoading, data } = useChatSettings();

  if (isLoading || !data) {
    return null;
  }

  return (
    <>
      <ChatBot.Content>
        <ChatBot.Bubble
          type="user"
          text="Hello, how can I help you today?"
          color={data?.assistant_styles?.user_bubble_text}
          backgroundColor={data?.assistant_styles?.bubble_color_user}
        />
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
      </ChatBot.Content>
      <ChatBot.ToolBar />
    </>
  );
};

export default ChatbotPage;
