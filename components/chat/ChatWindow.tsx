import React, { useState } from 'react';
import { Chat, Label, Message, MessageType } from '../../types';
import ChatHeader from './ChatHeader';
import MessageArea from './MessageArea';
import MessageInput from './MessageInput';
import LabelManagerModal from '../modals/LabelManagerModal';
import { users } from '../../data/mockData';

interface ChatWindowProps {
    chat: Chat;
    onBack: () => void;
    allLabels: Label[];
    onUpdateChatLabels: (chatId: string, labelIds: string[]) => void;
    onUpdateAllLabels: (labels: Label[]) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onBack, allLabels, onUpdateChatLabels, onUpdateAllLabels }) => {
    const [messages, setMessages] = useState<Message[]>(chat.messages);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

    const handleSendMessage = (content: string, type: MessageType, file?: File) => {
        const newMessage: Message = {
            id: `m${Date.now()}`,
            senderId: users[0].id, // Assuming current user is Agent Smith
            content: content,
            timestamp: new Date(),
            type: type,
            mediaUrl: file ? URL.createObjectURL(file) : undefined,
            fileName: file?.name
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="flex flex-col h-full w-full">
            <ChatHeader
                chat={chat}
                onBack={onBack}
                onOpenLabelManager={() => setIsLabelModalOpen(true)}
            />
            <MessageArea messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
            {isLabelModalOpen && (
                <LabelManagerModal
                    chat={chat}
                    allLabels={allLabels}
                    onClose={() => setIsLabelModalOpen(false)}
                    onSave={(updatedLabelIds) => {
                        onUpdateChatLabels(chat.id, updatedLabelIds);
                        setIsLabelModalOpen(false);
                    }}
                    onUpdateAllLabels={onUpdateAllLabels}
                />
            )}
        </div>
    );
};

export default ChatWindow;