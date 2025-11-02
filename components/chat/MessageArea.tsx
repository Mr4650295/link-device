import React, { useEffect, useRef } from 'react';
import { Message } from '../../types';
import MessageBubble from './MessageBubble';

interface MessageAreaProps {
    messages: Message[];
}

const MessageArea: React.FC<MessageAreaProps> = ({ messages }) => {
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={endOfMessagesRef} />
        </div>
    );
};

export default MessageArea;
