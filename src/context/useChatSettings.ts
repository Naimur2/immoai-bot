import { useContext } from "react";
import ChatSettingsContext from "./ChatSettingsContext";

export default function useChatSettings() {
  const state = useContext(ChatSettingsContext);

  return {
    data: state.data,
    isLoading: state.isLoading,
    page: state.page,
    setPage: state.setPage,
    isOpened: state.isOpened,
    setIsOpened: state.setIsOpened,
  };
}
