import { TGetAssistantConfig } from "../components/types";
export type ChatSettingsContextType = {
    setData: (data: TGetAssistantConfig) => void;
    data: TGetAssistantConfig | null;
    page: "description" | "chat";
    isLoading: boolean;
    setPage: (page: "description" | "chat") => void;
};
export declare const SET_SETTINGS = "SET_SETTINGS";
declare const ChatSettingsContext: import("react").Context<ChatSettingsContextType>;
export default ChatSettingsContext;
