import React from "react";
import ChatBubble from "./components/ChatBubble";
import DateSeparator from "./components/DateSeparator";
import ChatHeader from "./components/ChatHeader";
import MultiChoiceOption from "./components/MultiChoiceOption";
import ChatToolbar from "./components/ChatToolbar";

import ChatContent from "./components/ChatContent";
import { cn } from '../../lib/utils';

export default function ChatBot({
  children,
  className,
  borderRadius,
  ...rest
}: React.ComponentProps<"div"> & {
  borderRadius?: string;
}) {
  const hasToolbar = Object.keys(ChatBot).includes("ToolBar");


  return (
    <div
      className={cn(
        "card p-0 grid grid-rows-[auto,1fr] overflow-hidden mb-4 rounded-[var(--border-radius)]",
        {
          "grid grid-rows-[auto,1fr,auto]": hasToolbar,
        },
        className
      )}
      style={{
        '--border-radius': borderRadius,
      } as React.CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}

ChatBot.Bubble = ChatBubble;
ChatBot.DateTime = DateSeparator;
ChatBot.Header = ChatHeader;
ChatBot.MultiChoiceOption = MultiChoiceOption;
ChatBot.ToolBar = ChatToolbar;
ChatBot.Content = ChatContent;
