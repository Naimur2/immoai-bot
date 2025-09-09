import React from "react";
import useChatSettings from "../context/useChatSettings";
import ChatWidget from "./ChatWidget";
import Conversation from "./Conversation";

const ChatBox: React.FC = () => {
  const { data, isLoading, isOpened } = useChatSettings();

  if (isLoading || !data) {
    return null;
  }
  

  return isOpened ? <Conversation /> : <ChatWidget />;
};

export default ChatBox;
