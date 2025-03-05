import React from "react";
export type Media = {
    id: string;
    file: File;
    preview: string;
};
interface ChatToolbarProps {
    onSend: (data: {
        message: string;
        media: Media | false;
        file_id: any;
    }) => void;
    isDisabled: boolean;
}
export default function ChatToolbar({ onSend, isDisabled }: ChatToolbarProps): React.JSX.Element;
export {};
