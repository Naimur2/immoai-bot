import React from "react";
import useChatSettings from "../../context/useChatSettings";
import ChatBot from "../ChatBot";
import ChatDetails from "./ChatDetails";
import ChatbotPage from "./ChatPage";

const ChatBox: React.FC = () => {
  const { data, isLoading, page, setPage } = useChatSettings();

  if (isLoading || !data) {
    return null;
  }

  const chatBorderRadius = data?.assistant_styles?.chat_style_border_radius;

  return (
    <div
      className={
        "fixed bottom-6 right-10 rounded-md w-[clamp(10rem,calc(100vw-80px),50rem)] open-chat h-[clamp(15rem,88vh,70rem)] xl:w-[clamp(10rem,calc(100vw-80px),38rem)]  grid"
      }
    >
      <ChatBot
        borderRadius={chatBorderRadius ? `${chatBorderRadius}px` : undefined}
      >
        <ChatBot.Header
          title={data?.assistant_general?.botname}
          subtitle={data?.assistant_general?.description}
          avatar={data?.assistant_general?.bot_image}
          backgroundColor={data?.assistant_styles?.header_background}
        >
          <ChatBot.Header.Right>
            {page === "description" && (
              <ChatBot.Header.Right.BackButton
                onClick={() => setPage("chat")}
              />
            )}
            {page === "chat" && (
              <ChatBot.Header.Right.InfoButton
                onClick={() => setPage("description")}
              />
            )}
            <ChatBot.Header.Right.CloseButton />
          </ChatBot.Header.Right>
        </ChatBot.Header>
        {page === "description" ? <ChatDetails /> : <ChatbotPage />}
      </ChatBot>
    </div>
  );
};

export default ChatBox;
