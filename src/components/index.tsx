import React from "react";
import ChatBox from "../content";
import ChatSettingsProvider from "../context/ChatSettingsProvider";
import { TGetAssistantConfig } from "./types";

interface ChatbotProps {
  apiKey: string;
  theme?: string;
}

const ChatWidget: React.FC<ChatbotProps> = ({ apiKey }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<TGetAssistantConfig | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!apiKey) {
        return;
      }
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://api.immoai-bot.com/chatbot/api/get/assistant_configs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              api_key: apiKey,
            },
          }
        );

        const resData = (await res.json()) as TGetAssistantConfig;
        setData(resData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error initializing chatbot", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  if (!apiKey || isLoading || !data) {
    return null;
  }

  return (
    <ChatSettingsProvider apiKey={apiKey}>
      <ChatBox />
    </ChatSettingsProvider>
  );
};

export default ChatWidget;
