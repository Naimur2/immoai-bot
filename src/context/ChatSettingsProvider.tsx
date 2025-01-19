import React, { useState } from "react";
import { TGetAssistantConfig } from "../components/types";
import ChatSettingsContext from "./ChatSettingsContext";

const ChatSettingsProvider = ({
  children,
  apiKey,
}: {
  children: React.ReactNode;
  apiKey: string;
}) => {
  const [data, setData] = useState<TGetAssistantConfig | null>(null);
  const [page, setPage] = useState<"description" | "chat">("description");
  const [isOpened, setIsOpened] = useState(false);
  const socketRef = React.useRef<WebSocket | null>(null);

  const [isLoading, setIsLoading] = React.useState(true);

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

  React.useEffect(() => {
   try {
     if (apiKey) {
       const ws = new WebSocket(
         `wss://api.immoai-bot.com/chatbot/start_chat/ws/${apiKey}`
       );

       socketRef.current = ws;

       socketRef.current.onmessage = (event) => {
         console.log("Message received", event.data);
       };

       socketRef.current.onopen = () => {
         console.log("Socket opened");
       };
       socketRef.current.onclose = () => {
         console.log("Socket closed");
       };
       socketRef.current.onerror = (err) => {
         console.log("Socket error", err);
       };
     }
   } catch (error) {
      console.error("Error initializing chatbot", error);
   }
  }, [apiKey]);

  const value = React.useMemo(
    () => ({
      data,
      setData: (data: TGetAssistantConfig) => {
        setData(data);
      },
      isLoading,
      page,
      setPage: (page: "description" | "chat") => {
        setPage(page);
      },
      isOpened,
      setIsOpened: (isOpened: boolean) => {
        setIsOpened(isOpened);
      },
    }),
    [data, isLoading, isOpened, page]
  );

  return (
    <ChatSettingsContext.Provider value={value}>
      {children}
    </ChatSettingsContext.Provider>
  );
};

export default ChatSettingsProvider;
