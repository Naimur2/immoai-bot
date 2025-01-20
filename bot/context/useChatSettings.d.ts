export default function useChatSettings(): {
    data: import("../components/types").TGetAssistantConfig | null;
    isLoading: boolean;
    page: "description" | "chat";
    setPage: (page: "description" | "chat") => void;
    isOpened: boolean;
    setIsOpened: (isOpened: boolean) => void;
    sendMessage: (message: string) => void;
    messages: import("./ChatSettingsContext").TMessage[];
    isChatLoading: boolean;
};
