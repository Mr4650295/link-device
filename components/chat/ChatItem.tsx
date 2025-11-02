import React from 'react';
import { Chat, Label } from '../../types';
import Avatar from '../ui/Avatar';
import LabelPill from '../ui/LabelPill';

interface ChatItemProps {
    chat: Chat;
    labels: Label[];
    isSelected: boolean;
    onClick: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, labels, isSelected, onClick }) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    const otherParticipant = chat.participants.find(p => !p.isTeamMember);
    const name = chat.name || otherParticipant?.name || 'Unknown User';
    const avatarUrl = chat.avatarUrl || otherParticipant?.avatarUrl || 'https://picsum.photos/200';

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div
            className={`flex items-center p-3 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-wa-msg-dark ${isSelected ? 'bg-gray-200 dark:bg-wa-msg-dark' : ''}`}
            onClick={onClick}
        >
            <Avatar src={avatarUrl} alt={name} />
            <div className="flex-1 ml-3 min-w-0">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold truncate">{name}</h3>
                    {lastMessage && <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(lastMessage.timestamp)}</span>}
                </div>
                <div className="flex justify-between items-start mt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {lastMessage ? lastMessage.content : 'No messages yet'}
                    </p>
                    <div className="flex-shrink-0 ml-2">
                        {labels.length > 0 && <LabelPill label={labels[0]} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatItem;
