import React from "react";
import ChatBubble from "./components/ChatBubble";
import DateSeparator from "./components/DateSeparator";
import ChatHeader from "./components/ChatHeader";
import ChatToolbar from "./components/ChatToolbar";
declare function ChatBot({ children, className, borderRadius, style, ...rest }: React.ComponentProps<"div"> & {
    borderRadius?: string;
}): React.JSX.Element;
declare namespace ChatBot {
    var Bubble: typeof ChatBubble;
    var DateTime: typeof DateSeparator;
    var Header: typeof ChatHeader;
    var MultiChoiceOption: typeof import("./components/MultiChoiceOption").default;
    var ToolBar: typeof ChatToolbar;
    var Content: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<import("./components/ChatContent").TChatContentRef>>;
    var TermsModal: typeof import("./components/TermsModal").default;
}
export default ChatBot;
