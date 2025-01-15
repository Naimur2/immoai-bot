export interface IChatbotGeneral {
    bot_image: string;
    botname: string;
    description: string;
    text_placeholder: string;
    language: string;
    appointment_management: string;
    agent_address: string;
    get_privacy_policy_before_chat: string;
    enable_inmessage_fileuploads: string;
    agent_documents: string;
    enable_deletion_of_conversations: string;
    agent_email: string;
    agent_telephone: string;
    agent_website: string;
    terms_and_conditions_url: string;
    privacy_policy_url: string;
}
export interface IChatbotStyles {
    chat_widget_image: string;
    chat_widget_color: string;
    widget_size: number;
    show_chat_now_box: string;
    chat_now_appear_time: string;
    chat_now_box_color: string;
    box_width: number;
    box_height: number;
    widget_border_radius: number;
    chat_now_box_text_color: string;
    text_to_appear: string;
    header_background: string;
    chat_background_color: string;
    bot_avatar_color: string;
    bot_bubble_color: string;
    bot_bubble_text: string;
    bubble_color_user: string;
    user_bubble_text: string;
    chat_style_border_radius: number;
    chat_style_height: number;
    chat_style_width: number;
    right_to_left_direction: string;
}
export interface IUpdateChatbot {
    status: string;
    message: string;
    api_key: string;
}
export type TGetAssistantConfig = {
    assistant_general: IChatbotGeneral | null;
    assistant_styles: IChatbotStyles | null;
    assistant_files: TAssistantFiles | null;
};
export type TAssistantFiles = {
    [key: string]: {
        file_id: string;
        time_created: string;
    };
};
