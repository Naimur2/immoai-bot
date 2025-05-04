import React from "react";
type TOptions = {
    label: string;
    value: string;
};
type ChatBubbleBotProps = {
    type?: "bot" | "user";
    options: TOptions[];
    onSelected?: (value: string) => void;
};
export default function MultiChoiceOption({ type, options, onSelected, }: ChatBubbleBotProps): React.JSX.Element;
export {};
