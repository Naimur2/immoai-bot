import React from "react";
import ChatBox from "../content";
import ChatSettingsProvider from "../context/ChatSettingsProvider";

const AiChatBot = ({ apiKey }: { apiKey: string }) => {
  if (!apiKey) {
    return null;
  }

  return (
    <ChatSettingsProvider apiKey={apiKey}>
      <ChatBox />
    </ChatSettingsProvider>
  );
};

export default AiChatBot;
