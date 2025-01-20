import React, { useState } from "react";
import { TGetAssistantConfig } from "../components/types";
import ChatSettingsContext, { TMessage } from "./ChatSettingsContext";

type TMessageReceived = {
  status: "success" | "error";
  message: string;
};

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
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = React.useState(false);

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
          "http://35.157.208.171:8000/chatbot/api/get/assistant_configs",
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
          `ws://35.157.208.171:8000/chatbot/start_chat/ws/${apiKey}`
        );

        socketRef.current = ws;

        socketRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data) as TMessageReceived;
          if (data.status === "success") {
            setMessages((prev) => [
              ...prev,
              { type: "bot", message: data.message },
            ]);
            setIsChatLoading(false);
          }
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
      sendMessage: (message: string) => {
        if (socketRef.current) {
          setIsChatLoading(true);
          setMessages((prev) => [...prev, { type: "user", message }]);
          socketRef.current.send(message);
        }
      },
      messages,
      isChatLoading
    }),
    [data, isLoading, isOpened, messages, page, isChatLoading]
  );

  return (
    <ChatSettingsContext.Provider value={value}>
      {children}
    </ChatSettingsContext.Provider>
  );
};

export default ChatSettingsProvider;
