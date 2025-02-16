import React from "react";
import ChatBot from "../components/ChatBot";
import useChatSettings from "../context/useChatSettings";
import ChatDetails from "./ChatDetails";
import ChatbotPage from "./ChatPage";

const Conversation: React.FC = () => {
  const {
    data,
    isLoading,
    page,
    setPage,
    setIsOpened,
    withTerms,
    showAcceptTermsCount,
  } = useChatSettings();

  if (isLoading || !data) {
    return null;
  }

  const chatBorderRadius = data?.assistant_styles?.chat_style_border_radius;
  const chatbotHeight = data?.assistant_styles?.chat_style_height;
  const chatbotWidth = data?.assistant_styles?.chat_style_width;

  return (
    <div
      className={
        "fixed bottom-8 right-10 w-[clamp(10rem,calc(var(--chatbot-width,100vw)-80px),50rem)] open-chat h-[clamp(15rem,var(--chatbot-height,88vh),70rem)] xl:w-[clamp(10rem,calc(100vw-80px),38rem)]  grid"
      }
      style={
        {
          zIndex: 999999999,
          "--chatbot-height": chatbotHeight ? `${chatbotHeight}vh` : undefined,
          "--chatbot-width": chatbotWidth ? `${chatbotWidth}vw` : undefined,
        } as React.CSSProperties
      }
    >
      <ChatBot
        borderRadius={chatBorderRadius ? `${chatBorderRadius}px` : undefined}
        style={{
          backgroundColor: data?.assistant_styles?.chat_background_color,
        }}
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
            <ChatBot.Header.Right.CloseButton
              onClick={() => {
                setIsOpened(false);
                setPage("description");
              }}
            />
          </ChatBot.Header.Right>
        </ChatBot.Header>
        {page === "description" ? <ChatDetails /> : <ChatbotPage />}
        <ChatBot.TermsModal />
      </ChatBot>
    </div>
  );
};

export default Conversation;
