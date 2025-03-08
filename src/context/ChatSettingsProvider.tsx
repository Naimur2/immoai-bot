import React, { useLayoutEffect, useState } from "react";
import { TGetAssistantConfig } from "../components/types";
import ChatSettingsContext, { TMessage } from "./ChatSettingsContext";
import { Media } from "@/components/ChatBot/components/ChatToolbar";

// const baseUrl = "http://localhost:8000";
const baseUrl = "https://api.immoai-bot.com";

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
  const [showAcceptTermsCount, setShowAcceptTermsCount] = React.useState(0);
  const [withTerms, setWithTerms] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!apiKey) {
        return;
      }
      try {
        setIsLoading(true);

        const url = `${baseUrl}/chatbot/api/get/assistant_configs`;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            api_key: apiKey,
          },
        });

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

        // const ws = new WebSocket(
        //   `ws://localhost:8000/chatbot/start_chat/ws/${apiKey}`
        // );

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

  useLayoutEffect(() => {
    const showAcceptTermsCount =
      data?.assistant_general?.get_privacy_policy_before_chat === "An" ||
      data?.assistant_general?.get_privacy_policy_before_chat === "yes";

    setWithTerms(showAcceptTermsCount);
  }, [data]);

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
      sendMessage: (message: string, attachment: false | Media) => {
        if (socketRef.current) {
          setIsChatLoading(true);
          try {

            var visitor_id = window.localStorage.getItem('visitor_id')
            if(!visitor_id){
              visitor_id = Math.random().toString(36).substring(7);
              window.localStorage.setItem('visitor_id', visitor_id)
            }

            const messageData = JSON.parse(message);
            messageData.attachment = attachment;
            messageData.visitor_id = visitor_id
            console.log('visitor_id',visitor_id);
            message = JSON.stringify(messageData);
          } catch (error) {
            
          }
          setMessages((prev) => [...prev, { type: "user", message }]);
          socketRef.current.send(message);
        }
      },
      messages,
      isChatLoading,
      showAcceptTermsCount,
      setShowAcceptTermsCount: (val: number) => {
        setShowAcceptTermsCount((prev) => prev + val);
      },
      withTerms,
      shoWModal: showModal,
      setShowModal: (showModal: boolean) => {
        setShowModal(showModal);
      },
      hasAcceptedTerms,
      setHasAcceptedTerms: (hasAcceptedTerms: boolean) => {
        setHasAcceptedTerms(hasAcceptedTerms);
      },
    }),
    [
      data,
      isLoading,
      isOpened,
      messages,
      page,
      isChatLoading,
      showAcceptTermsCount,
      withTerms,
      showModal,
      hasAcceptedTerms,
    ]
  );



  return (
    <ChatSettingsContext.Provider value={value}>
      {children}
    </ChatSettingsContext.Provider>
  );
};

export default ChatSettingsProvider;
