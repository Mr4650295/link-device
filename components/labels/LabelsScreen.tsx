import React, { useState } from 'react';
import { Label, Chat } from '../../types';
import LabelEditorModal from '../modals/LabelEditorModal';
import ChatItem from '../chat/ChatItem';
import { ArrowLeftIcon, ChevronRightIcon, EditIcon } from '../../assets/icons';

interface LabelsScreenProps {
    allLabels: Label[];
    chats: Chat[];
    onBack: () => void;
    onSelectChat: (chatId: string) => void;
    onSaveLabels: (labels: Label[]) => void;
}

const LabelsScreen: React.FC<LabelsScreenProps> = ({ allLabels, chats, onBack, onSelectChat, onSaveLabels }) => {
    const [detailedLabel, setDetailedLabel] = useState<Label | null>(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const getChatCountForLabel = (labelId: string) => {
        return chats.filter(chat => chat.labelIds.includes(labelId)).length;
    };

    if (detailedLabel) {
        const filteredChats = chats.filter(chat => chat.labelIds.includes(detailedLabel.id));
        return (
            <div className="h-screen w-screen bg-wa-bg-light dark:bg-wa-bg-dark flex flex-col">
                <header className="flex-shrink-0 flex items-center p-3 bg-gray-100 dark:bg-wa-msg-dark border-b border-gray-200 dark:border-gray-700">
                    <button onClick={() => setDetailedLabel(null)} className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <div className="flex items-center">
                        <span className={`w-4 h-4 rounded-full ${detailedLabel.color} mr-3`}></span>
                        <h2 className="text-lg font-semibold">{detailedLabel.name}</h2>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto">
                    {filteredChats.length > 0 ? (
                        filteredChats.map(chat => (
                            <ChatItem
                                key={chat.id}
                                chat={chat}
                                labels={allLabels.filter(l => chat.labelIds.includes(l.id))}
                                isSelected={false}
                                onClick={() => onSelectChat(chat.id)}
                            />
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No chats found for this label.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-wa-bg-light dark:bg-wa-bg-dark flex flex-col">
            <header className="flex-shrink-0 flex items-center p-3 bg-gray-100 dark:bg-wa-msg-dark border-b border-gray-200 dark:border-gray-700">
                <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-semibold">Labels</h2>
                <button 
                    onClick={() => setIsEditorOpen(true)} 
                    className="ml-auto p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Edit Labels"
                >
                    <EditIcon className="w-6 h-6" />
                </button>
            </header>
            <div className="flex-1 overflow-y-auto p-2">
                <ul className="bg-white dark:bg-wa-msg-dark rounded-lg shadow">
                    {allLabels.map((label, index) => (
                        <li key={label.id} className={`${index > 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}>
                            <button onClick={() => setDetailedLabel(label)} className="w-full flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                                <span className={`w-5 h-5 rounded-full ${label.color} mr-4`}></span>
                                <span className="flex-grow text-left font-medium">{label.name}</span>
                                <span className="text-gray-500 dark:text-gray-400 mr-2">{getChatCountForLabel(label.id)}</span>
                                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {isEditorOpen && (
                <LabelEditorModal
                    allLabels={allLabels}
                    onClose={() => setIsEditorOpen(false)}
                    onSave={onSaveLabels}
                />
            )}
        </div>
    );
};

export default LabelsScreen;
