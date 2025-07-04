import React from "react";
import Button from "../components/Button";
import ChatBot from "../components/ChatBot";
import useChatSettings from "../context/useChatSettings";

import defaultImage from "../assets/images/td.png";
import globeSvg from "../assets/svg/globe.svg";
import mailSvg from "../assets/svg/mail.svg";
import telephoneSvg from "../assets/svg/telephone.svg";

export default function ChatDetails() {
    const {
        data,
        isLoading,
        setShowAcceptTermsCount,
        showAcceptTermsCount,
        setPage,
        withTerms,
        setShowModal,
        hasAcceptedTerms,
    } = useChatSettings();

    if (isLoading || !data) {
        return null;
    }

    return (
        <ChatBot.Content>
            <div className="py-4 flex flex-col gap-2 items-center justify-center text-center">
                <img
                    src={data?.assistant_general?.bot_image || defaultImage}
                    alt="bot"
                    width={100}
                    height={100}
                    className="rounded-full size-20 object-cover"
                />
                <h2 className="text-[#313131] font-bold text-2xl">
                    {data?.assistant_general?.botname || "Max"}
                </h2>
                <p>
                    {data?.assistant_general?.description ||
                        "Ihr persönlicher Assistent für alle Fragen rund um TD Dig"}
                </p>
            </div>
            <div className="py-4 flex flex-col gap-4">
                <div className="py-4 px-4 w-full max-w-lg grid grid-cols-[1.5rem,1fr] gap-4 mx-auto bg-chat-item-bg rounded-lg">
                    <img
                        src={telephoneSvg}
                        alt="phone"
                        width={24}
                        height={24}
                        className="size-5 sm:size-6"
                    />
                    <a
                        className="text-[#313131] font-medium text-sm sm:text-lg"
                        href={`tel:${data?.assistant_general?.agent_telephone}`}
                    >
                        {data?.assistant_general?.agent_telephone ||
                            "0800 123 456"}
                    </a>
                </div>
                <div className="py-4 px-4 w-full max-w-lg grid grid-cols-[1.5rem,1fr] gap-4 mx-auto bg-chat-item-bg rounded-lg">
                    <img
                        src={globeSvg}
                        alt="phone"
                        width={24}
                        height={24}
                        className="size-5 sm:size-6"
                    />
                    <a
                        className="text-[#313131] font-medium text-sm sm:text-lg"
                        href={data?.assistant_general?.agent_website}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {data?.assistant_general?.agent_website ||
                            "https://www.td-digitalsolutions.com/"}
                    </a>
                </div>
                <div className="py-4 px-4 w-full max-w-lg grid grid-cols-[1.5rem,1fr] gap-4 mx-auto bg-chat-item-bg rounded-lg">
                    <img
                        src={mailSvg}
                        alt="phone"
                        width={24}
                        height={24}
                        className="translate-y-1 size-5 sm:size-6"
                    />
                    <a
                        className="text-[#313131] font-medium text-sm sm:text-lg"
                        href={`mailto:${data?.assistant_general?.agent_email}`}
                    >
                        {data?.assistant_general?.agent_email ||
                            "info@td-digitalsolutions.com"}
                    </a>
                </div>
            </div>
            <div className="py-4">
                <a
                    className="text-black font-medium text-base sm:text-lg mx-auto border-t border-b border-[#CCBDFF] py-2 w-full max-w-lg text-center px-4 block"
                    href={data?.assistant_general?.terms_and_conditions_url}
                    target="_blank"
                >
                    Geschäftsbedingungen
                </a>
                <a
                    className="text-black font-medium text-base sm:text-lg mx-auto border-b border-[#CCBDFF] py-2 w-full max-w-lg text-center px-4 block"
                    href={data?.assistant_general?.privacy_policy_url}
                    target="_blank"
                >
                    Datenschutzerklärung
                </a>
            </div>
            <div className="py-4">
                <Button
                    className="max-w-[320px] w-full mx-auto"
                    onClick={() => {
                        if (
                            (withTerms && showAcceptTermsCount < 1) ||
                            !hasAcceptedTerms
                        ) {
                            setShowAcceptTermsCount(showAcceptTermsCount + 1);
                            setShowModal(true);
                        } else {
                            setPage("chat");
                        }
                    }}
                >
                    Zurück zur Unterhaltung
                </Button>
            </div>
        </ChatBot.Content>
    );
}
