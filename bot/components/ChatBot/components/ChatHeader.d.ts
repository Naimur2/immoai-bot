import React from "react";
type TChatHeaderProps = {
    title?: string;
    subtitle?: string;
    avatar?: string;
    children?: React.ReactNode;
    backgroundColor?: string;
};
declare function ChatHeader({ title, subtitle, avatar, children, backgroundColor, }: TChatHeaderProps): React.JSX.Element;
declare namespace ChatHeader {
    var Right: {
        ({ children, className, ...rest }: React.ComponentProps<"div">): React.JSX.Element;
        BackButton: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
        InfoButton: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
        CloseButton: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
    };
}
export default ChatHeader;
