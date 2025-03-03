import { createContext } from "react";
import { TGetAssistantConfig } from "../components/types";
import { Media } from "@/components/ChatBot/components/ChatToolbar";

export type TMessage = {
  type: "user" | "bot";
  message: string;
};

export type ChatSettingsContextType = {
  setData: (data: TGetAssistantConfig) => void;
  data: TGetAssistantConfig | null;
  page: "description" | "chat";
  isLoading: boolean;
  setPage: (page: "description" | "chat") => void;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  sendMessage: (message: string, attachment : Media | false) => void;
  messages: TMessage[];
  isChatLoading: boolean;
  showAcceptTermsCount: number;
  setShowAcceptTermsCount: (showAcceptTermsCount: number) => void;
  withTerms: boolean;
  shoWModal: boolean;
  setShowModal: (showModal: boolean) => void;
  hasAcceptedTerms: boolean;
  setHasAcceptedTerms: (hasAcceptedTerms: boolean) => void;
};

export const SET_SETTINGS = "SET_SETTINGS";

const ChatSettingsContext = createContext<ChatSettingsContextType>(
  {} as ChatSettingsContextType
);

export default ChatSettingsContext;
