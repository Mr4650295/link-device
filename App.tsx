import React, { useState, useEffect } from 'react';
import { Chat, Label } from './types';
import { mockChats, mockLabels } from './data/mockData';
import ChatList from './components/chat/ChatList';
import ChatWindow from './components/chat/ChatWindow';
import { useTheme } from './hooks/useTheme';
import LabelsScreen from './components/labels/LabelsScreen';
import SettingsScreen from './components/settings/SettingsScreen';

const App: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>(mockChats);
    const [labels, setLabels] = useState<Label[]>(mockLabels);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [isLabelsScreenOpen, setIsLabelsScreenOpen] = useState(false);
    const [isSettingsScreenOpen, setIsSettingsScreenOpen] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
    }, [theme]);
    
    const selectedChat = chats.find(chat => chat.id === selectedChatId) || null;

    const handleUpdateLabels = (updatedLabels: Label[]) => {
        setLabels(updatedLabels);
    };

    const handleSelectChat = (chatId: string) => {
        setSelectedChatId(chatId);
        setIsLabelsScreenOpen(false);
        setIsSettingsScreenOpen(false);
    };

    if (isLabelsScreenOpen) {
        return (
            <LabelsScreen
                allLabels={labels}
                chats={chats}
                onBack={() => setIsLabelsScreenOpen(false)}
                onSelectChat={handleSelectChat}
                onSaveLabels={handleUpdateLabels}
            />
        );
    }

    if (isSettingsScreenOpen) {
        return (
            <SettingsScreen
                onBack={() => setIsSettingsScreenOpen(false)}
            />
        );
    }

    return (
        <div className="h-screen w-screen bg-wa-bg-light dark:bg-wa-bg-dark text-gray-900 dark:text-gray-100 flex overflow-hidden">
            <div className="w-full h-full flex md:p-4 md:max-w-7xl md:mx-auto md:max-h-[95vh] md:my-auto">
                {/* Chat List */}
                <div className={`
                    w-full md:w-1/3 md:flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-wa-bg-dark
                    transition-transform duration-300 ease-in-out
                    ${selectedChatId ? 'md:flex' : 'flex'}
                    ${selectedChatId && 'hidden'}
                `}>
                    <ChatList
                        chats={chats}
                        labels={labels}
                        selectedChatId={selectedChatId}
                        onSelectChat={setSelectedChatId}
                        onOpenLabelsScreen={() => setIsLabelsScreenOpen(true)}
                        onOpenSettingsScreen={() => setIsSettingsScreenOpen(true)}
                    />
                </div>

                {/* Chat Window */}
                <div className={`
                    w-full md:w-2/3 flex flex-col bg-wa-bg-chat dark:bg-wa-bg-chat-dark
                    transition-transform duration-300 ease-in-out
                    ${selectedChatId ? 'flex' : 'hidden'}
                    ${selectedChatId && 'md:flex'}
                `}>
                    {selectedChat ? (
                        <ChatWindow
                            key={selectedChat.id} // Add key to force re-mount on chat change
                            chat={selectedChat}
                            onBack={() => setSelectedChatId(null)}
                            allLabels={labels}
                            onUpdateChatLabels={(chatId, labelIds) => {
                                setChats(prevChats => prevChats.map(c => c.id === chatId ? {...c, labelIds} : c));
                            }}
                            onUpdateAllLabels={handleUpdateLabels}
                        />
                    ) : (
                        <div className="hidden md:flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                             <h2 className="text-2xl font-medium">OmniConnect</h2>
                             <p className="mt-2">Select a chat to begin messaging.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;