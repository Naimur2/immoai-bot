export default function useChatSettings(): {
    data: import("../components/types").TGetAssistantConfig | null;
    isLoading: boolean;
    page: "description" | "chat";
    setPage: (page: "description" | "chat") => void;
};
