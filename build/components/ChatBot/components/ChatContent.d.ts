import React from "react";
export type TChatContentRef = {
    scrollToBottom: () => void;
};
declare const ChatContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<TChatContentRef>>;
export default ChatContent;
