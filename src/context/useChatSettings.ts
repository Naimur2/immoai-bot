import { useContext } from "react";
import ChatSettingsContext from "./ChatSettingsContext";

export default function useChatSettings() {
  const state = useContext(ChatSettingsContext);

  return state;
}
