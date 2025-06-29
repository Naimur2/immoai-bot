import React from "react";
import ChatBot from "../components/ChatBot";
import useChatSettings from "../context/useChatSettings";
import ChatDetails from "./ChatDetails";
import ChatbotPage from "./ChatPage";

const Conversation: React.FC = () => {
    const { data, isLoading, page, setPage, setIsOpened } = useChatSettings();

    if (isLoading || !data) {
        return null;
    }

    const chatBorderRadius = data?.assistant_styles?.chat_style_border_radius;
    const chatbotHeight = data?.assistant_styles?.chat_style_height;
    const chatbotWidth = data?.assistant_styles?.chat_style_width;

    return (
        <div
            className={
                "fixed bottom-8 right-2 sm:right-10 open-chat w-[calc(100vw-16px)] h-[clamp(240px,var(--chatbot-height,90dvh),1120px)] sm:w-[clamp(160px,calc(100dvw-80px),680px)]  grid"
            }
            style={
                {
                    zIndex: 999999999,
                    "--chatbot-height": chatbotHeight
                        ? `${chatbotHeight}dvh`
                        : undefined,
                    "--chatbot-width": chatbotWidth
                        ? `${chatbotWidth}vw`
                        : undefined,
                    borderRadius: chatBorderRadius,
                    overflow: "hidden",
                } as React.CSSProperties
            }
        >
            <ChatBot
                borderRadius={
                    chatBorderRadius ? `${chatBorderRadius}px` : undefined
                }
                style={{
                    backgroundColor:
                        data?.assistant_styles?.chat_background_color,
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
            </ChatBot>
            <ChatBot.TermsModal />
        </div>
    );
};

export default Conversation;
