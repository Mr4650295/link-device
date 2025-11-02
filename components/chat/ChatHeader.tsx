import React, { useState } from 'react';
import { Chat } from '../../types';
import Avatar from '../ui/Avatar';
import { ArrowLeftIcon, PhoneIcon, VideoIcon, TagIcon } from '../../assets/icons';
import CallModal from '../modals/CallModal';

interface ChatHeaderProps {
    chat: Chat;
    onBack: () => void;
    onOpenLabelManager: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onBack, onOpenLabelManager }) => {
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    
    const otherParticipant = chat.participants.find(p => !p.isTeamMember);
    const name = chat.name || otherParticipant?.name || 'Unknown User';
    const avatarUrl = chat.avatarUrl || otherParticipant?.avatarUrl || 'https://picsum.photos/200';

    const handleCallClick = () => {
        setIsCallModalOpen(true);
    };

    return (
        <>
            <header className="flex items-center p-3 bg-gray-100 dark:bg-wa-msg-dark border-b border-gray-200 dark:border-gray-700">
                <button onClick={onBack} className="md:hidden mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <Avatar src={avatarUrl} alt={name} />
                <div className="ml-3">
                    <h2 className="font-semibold">{name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">online</p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                    <button onClick={handleCallClick} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <PhoneIcon className="w-6 h-6" />
                    </button>
                    <button onClick={handleCallClick} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <VideoIcon className="w-6 h-6" />
                    </button>
                    {chat.type !== 'team' && (
                        <button onClick={onOpenLabelManager} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <TagIcon className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </header>
            {isCallModalOpen && <CallModal onClose={() => setIsCallModalOpen(false)} />}
        </>
    );
};

export default ChatHeader;