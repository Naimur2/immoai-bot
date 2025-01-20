import { TGetAssistantConfig } from "../components/types";
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
    sendMessage: (message: string) => void;
    messages: TMessage[];
    isChatLoading: boolean;
};
export declare const SET_SETTINGS = "SET_SETTINGS";
declare const ChatSettingsContext: import("react").Context<ChatSettingsContextType>;
export default ChatSettingsContext;
