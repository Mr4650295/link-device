import React from 'react';
import { Message, MessageType } from '../../types';
import { users } from '../../data/mockData';
import { CheckAllIcon } from '../../assets/icons';

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isSent = message.senderId === users[0].id;

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const renderMedia = () => {
        if (!message.mediaUrl) return null;

        switch (message.type) {
            case MessageType.IMAGE:
                return <img src={message.mediaUrl} alt="sent" className="rounded-lg max-w-xs md:max-w-sm" />;
            case MessageType.AUDIO:
                return <audio controls src={message.mediaUrl} className="w-full max-w-xs" />;
            case MessageType.DOCUMENT:
                return (
                    <a href={message.mediaUrl} target="_blank" rel="noopener noreferrer" className="flex items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,3.5L18.5,9H13V3.5M12,11L8,15H11V18H13V15H16L12,11Z" /></svg>
                        <span>{message.fileName || 'Document'}</span>
                    </a>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
            <div className={`
                p-2 rounded-lg max-w-md
                ${isSent
                    ? 'bg-wa-msg-sent-light dark:bg-wa-msg-sent-dark'
                    : 'bg-wa-msg-light dark:bg-wa-msg-dark'
                }
            `}>
                {renderMedia()}
                {message.content && <p className={message.mediaUrl ? 'mt-1' : ''}>{message.content}</p>}
                <div className={`text-xs mt-1 flex items-center ${isSent ? 'justify-end' : 'justify-start'} text-gray-500 dark:text-gray-400`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {isSent && <CheckAllIcon className="w-4 h-4 ml-1 text-wa-blue" />}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;