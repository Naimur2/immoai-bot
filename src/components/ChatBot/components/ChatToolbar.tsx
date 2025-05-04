import React, { useState } from "react";
import { cn } from "../../../lib/utils";
import SendIcon from "../../icons/SendIcon";
import { DocumentUpload } from "iconsax-react";
// Allowed file types
const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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

const baseUrl = "https://api.immoai-bot.com";

export default function ChatToolbar({ onSend, isDisabled }: ChatToolbarProps) {
    const [value, setValue] = useState("");
    const [media, setMedia] = useState<Media | null>(null);

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch(`${baseUrl}/chatbot/chat/attachment`, {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            console.log("File uploaded", result);
            return result;
        } catch (error) {
            console.error("File upload failed", error);
            return false;
        }
    };

    const handleSend = async () => {
        if (value.trim() == "") return;

        try {
            var file_id = false;

            if (media) {
                file_id = await uploadFile(media?.file);
            }
            // console.log(file_id)
            if (onSend) {
                onSend({
                    message: value,
                    media: media ? media : false,
                    file_id: file_id,
                });
            }
            setValue("");
            setMedia(null);
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file && allowedTypes.includes(file.type)) {
            const mediaId = `${Date.now()}_${file.name}`; // Mock upload ID
            setMedia({ id: mediaId, file, preview: URL.createObjectURL(file) });
        }
    };

    const removeMedia = () => {
        setMedia(null);
    };

    return (
        <div className="px-4 w-full bg-white">
            <div
                className={cn(
                    "grid grid-cols-[auto,1fr,auto] gap-4 py-2 border-t border-t-[#707C9726] w-full items-center justify-center",
                    {
                        "opacity-50 cursor-not-allowed pointer-events-none":
                            isDisabled,
                    }
                )}
            >
                {/* Attach Media Button */}
                <label className="cursor-pointer">
                    <input
                        type="file"
                        accept={allowedTypes.join(",")}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <DocumentUpload
                        className="text-gray-500 hover:text-gray-700"
                        size="28"
                        color="#FF8A65"
                    />
                </label>

                {/* Textarea and Preview */}
                <div className="flex flex-col w-full">
                    {media && (
                        <div className="flex items-center gap-2 p-2 border rounded-md">
                            {media.file.type.startsWith("image") ? (
                                <img
                                    src={media.preview}
                                    alt="Preview"
                                    className="w-10 h-10 object-cover rounded"
                                />
                            ) : (
                                <span className="text-sm text-gray-700">
                                    Document: {media.file.name}
                                </span>
                            )}
                            <button
                                onClick={removeMedia}
                                className="text-red-500 text-xs"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                    <textarea
                        className="placeholder:text-[#707C9750] text-[#707C97] font-heading font-medium text-base md:text-lg xl:text-xl py-1 px-1 outline-none p-4 resize-none min-h-[48px] scrollbar-hide"
                        value={value}
                        rows={2}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        placeholder="Schreibe eine Nachricht..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    ></textarea>
                </div>

                {/* Send Button */}
                <button
                    className="size-10 rounded-full grid place-items-center bg-headerBg disabled:opacity-55 disabled:cursor-not-allowed"
                    onClick={handleSend}
                    disabled={!value.trim() && !media}
                >
                    <SendIcon color="#fff" />
                </button>
            </div>
        </div>
    );
}
