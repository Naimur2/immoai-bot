import { createContext } from "react";
import { TGetAssistantConfig } from "../components/types";

export type ChatSettingsContextType = {
  setData: (data: TGetAssistantConfig) => void;
  data: TGetAssistantConfig | null;
  page: "description" | "chat";
  isLoading: boolean;
  setPage: (page: "description" | "chat") => void;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
};

export const SET_SETTINGS = "SET_SETTINGS";

const ChatSettingsContext = createContext<ChatSettingsContextType>(
  {} as ChatSettingsContextType
);

export default ChatSettingsContext;
