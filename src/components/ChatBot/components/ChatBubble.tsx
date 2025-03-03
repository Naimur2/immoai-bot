import React from "react";
import { cn } from "../../../lib/utils";
import defaultImage from "../../../assets/images/chatbot.png";
import Markdown from "react-markdown";
import { InlineWidget } from "react-calendly";

function isCalendlyAppointmentURL(url : string) {
    const regex = /^https?:\/\/calendly\.com\/[\w-]+\/[\w-]+$/;
    return regex.test(url);
}

type ChatBubbleBotProps = {
    text: string;
    type?: "bot" | "user";
    backgroundColor?: string;
    color?: string;
    image?: string;
    imageBackgroundColor?: string;
};

export default function ChatBubble({
    text,
    type,
    backgroundColor,
    color,
    image = defaultImage,
    imageBackgroundColor,
}: ChatBubbleBotProps) {
    let textParsed;
    var showAppointment = false;
    try {
        textParsed = JSON.parse(text);

        text = `
            <div>
                ${textParsed.message}
                ${textParsed.attachment ? `<p> <a target="__blank" href="${textParsed.attachment?.preview}"> Attachment : ${textParsed.attachment?.id} </a> </p>` : ''}
            </div>
        `;

       
    } catch (error) {
        if(isCalendlyAppointmentURL(text)){
            console.log('Calendly Appointment URL',text);
            showAppointment = true
        } 
    }

    console.log('showAppointment',showAppointment);

    return (
        <div
            className={cn("flex justify-end gap-4 items-center py-4", {
                "justify-start": type === "bot",
            })}
        >
            <div
                className={cn("max-w-[90%] grid gap-4 min-w-[40%]", {
                    "grid-cols-[auto,1fr]": type === "bot",
                })}
            >
                {type === "bot" && (
                    <div
                        className="!h-10 !w-10 rounded-full grid place-items-center bg-primary-100"
                        style={{ backgroundColor: imageBackgroundColor }}
                    >
                        <img
                            src={image}
                            alt="Chatbot Intro"
                            className="object-cover size-full"
                        />
                    </div>
                )}
                <div
                    className={cn(
                        "p-5 text-black border border-primary-100 font-medium",
                        {
                            "bg-primary-100 text-white rounded-b-[0.625rem] rounded-e-[0.625rem]":
                                type === "bot",
                            "rounded-s-[0.625rem] rounded-t-[0.625rem]":
                                type !== "bot",
                        }
                    )}
                    style={{ color, backgroundColor }}
                >
                    
                   { showAppointment ?  <InlineWidget
                    // styles={{ minHeight: "100px", width: "100%" }} 
                    url={text}
                    /> : <Markdown className="text-sm md:text-base prose lg:prose-xl" components={{
                        div: ({ node, ...props }) => <div dangerouslySetInnerHTML={{ __html: text }} {...props} />
                    }} />} 

                    


                </div>
            </div>
        </div>
    );
}
