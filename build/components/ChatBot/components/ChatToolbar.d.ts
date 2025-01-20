import React from "react";
type TChatToolbar = {
    onSend?: (text: string) => void;
    isDisabled?: boolean;
};
export default function ChatToolbar({ onSend, isDisabled }: TChatToolbar): React.JSX.Element;
export {};
