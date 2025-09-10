import React, { useEffect, useState } from "react";
import useChatSettings from "../context/useChatSettings";
import defaultImage from "../assets/images/bot.png";

export default function ChatWidget() {
  const [isOpened, setIsOpened] = useState(false);

  const { data, setIsOpened: setOpened } = useChatSettings();

  const chatWidgetImage =
    data?.assistant_styles?.chat_widget_image ?? defaultImage;
  const chatWidgetColor = data?.assistant_styles?.chat_widget_color ?? "#000";
  const widgetSize = data?.assistant_styles?.widget_size ?? 80;
  const widgetBorderRadius =
    data?.assistant_styles?.widget_border_radius ?? 999999;

  const showChatNow = data?.assistant_styles?.show_chat_now_box;

  const chatNowAppearTime = data?.assistant_styles?.chat_now_appear_time;

  const chatNowBoxWidth = data?.assistant_styles?.box_width;
  const chatNowBoxHeight = data?.assistant_styles?.box_height;

  const chatNowBoxBorderRadius =
    data?.assistant_styles?.widget_border_radius ?? 999999;
  const chatNowBoxColor = data?.assistant_styles?.chat_widget_color ?? "#000";
  const chatNowBoxTextColor =
    data?.assistant_styles?.chat_now_box_text_color ?? "#000";
  const chatNowBoxText = data?.assistant_styles?.text_to_appear ?? "Chat Now";

  const chatNowBoxBackgroundColor =
    data?.assistant_styles?.chat_now_box_color ?? "#ffffff";



  useEffect(() => {
    if (chatNowAppearTime) {
      setTimeout(
        () => {
          setIsOpened(true);
        },
        chatNowAppearTime?.includes("s")
          ? parseInt(chatNowAppearTime) * 1000
          : parseInt(chatNowAppearTime)
      );
    }
  }, [chatNowAppearTime]);


  if (!data || !isOpened) {
    return null;
  }





  return (
    <div
      className={
        "fixed bottom-8 right-10 open-chat  grid place-items-end gap-2 cursor-pointer"
      }
      style={{ zIndex: 999999999 }}
      onClick={() => setOpened(true)}
    >
      {showChatNow && (
        <div
          className="bg-white text-center px-6 py-2 font-medium bg-[var(--chat-now-background-color)] text-[var(--chat-now-text-color)] w-[var(--chat-now-width)] h-[var(--chat-now-height)]
          rounded-[var(--chat-now-border-radius)]"
          style={
            {
              "--chat-now-color": chatNowBoxColor,
              "--chat-now-width": chatNowBoxWidth
                ? chatNowBoxWidth + "px"
                : "auto",
              "--chat-now-border-radius": chatNowBoxBorderRadius + "px",
              "--chat-now-text-color": chatNowBoxTextColor,
              "--chat-now-background-color": chatNowBoxBackgroundColor,
              "--chat-now-height": chatNowBoxHeight,
            } as React.CSSProperties
          }
        >
          {chatNowBoxText}
        </div>
      )}
      <button
        className="object-cover size-[var(--widget-size)] bg-[var(--widget-color)] rounded-[var(--widget-border-radius)] overflow-hidden"
        style={
          {
            "--widget-color": chatWidgetColor,
            "--widget-size": widgetSize + "px",
            "--widget-border-radius": widgetBorderRadius + "px",
          } as React.CSSProperties
        }
      >
        <img
          src={chatWidgetImage}
          alt={data?.assistant_general?.botname || "Chat"}
          className="object-cover size-full"
        />
      </button>
    </div>
  );
}
