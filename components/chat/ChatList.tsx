import React, { useState, useRef, useEffect } from 'react';
import { Chat, Label } from '../../types';
import ChatItem from './ChatItem';
import { SearchIcon, MoreVerticalIcon } from '../../assets/icons';
import ThemeToggle from '../ui/ThemeToggle';
import Avatar from '../ui/Avatar';
import { users } from '../../data/mockData';

interface ChatListProps {
    chats: Chat[];
    labels: Label[];
    selectedChatId: string | null;
    onSelectChat: (chatId: string) => void;
    onOpenLabelsScreen: () => void;
    onOpenSettingsScreen: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, labels, selectedChatId, onSelectChat, onOpenLabelsScreen, onOpenSettingsScreen }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'customers' | 'team'>('customers');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const filteredChats = chats
        .filter(chat => {
            const chatTypeCondition = activeTab === 'customers' ? chat.type !== 'team' : chat.type === 'team';
            if (!chatTypeCondition) return false;

            const otherParticipant = chat.participants.find(p => !p.isTeamMember);
            const name = chat.name || otherParticipant?.name || 'Unknown';
            return name.toLowerCase().includes(searchTerm.toLowerCase());
        });

     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuClick = (action: () => void) => {
        action();
        setIsMenuOpen(false);
    }

    return (
        <div className="flex flex-col h-full">
            <header className="p-3 bg-gray-100 dark:bg-wa-msg-dark flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <Avatar src={users[0].avatarUrl} alt={users[0].name} />
                <div className="flex items-center space-x-2">
                   <ThemeToggle />
                   <div className="relative" ref={menuRef}>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                           <MoreVerticalIcon className="w-6 h-6" />
                        </button>
                        {isMenuOpen && (
                           <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 py-1">
                               <a 
                                 href="#" 
                                 onClick={(e) => { e.preventDefault(); handleMenuClick(onOpenLabelsScreen); }}
                                 className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                               >
                                 Manage Labels
                               </a>
                               <a 
                                 href="#" 
                                 onClick={(e) => { e.preventDefault(); handleMenuClick(onOpenSettingsScreen); }}
                                 className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                               >
                                 Settings
                               </a>
                           </div>
                        )}
                   </div>
                </div>
            </header>

            <div className="p-2 bg-gray-50 dark:bg-wa-bg-dark border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-200 dark:bg-wa-msg-dark text-sm focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button 
                    className={`flex-1 py-2 text-sm font-medium ${activeTab === 'customers' ? 'border-b-2 border-wa-green text-wa-green' : 'text-gray-500 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('customers')}
                >
                    Customers
                </button>
                <button 
                    className={`flex-1 py-2 text-sm font-medium ${activeTab === 'team' ? 'border-b-2 border-wa-green text-wa-green' : 'text-gray-500 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('team')}
                >
                    Team
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredChats.map(chat => (
                    <ChatItem
                        key={chat.id}
                        chat={chat}
                        labels={labels.filter(l => chat.labelIds.includes(l.id))}
                        isSelected={chat.id === selectedChatId}
                        onClick={() => onSelectChat(chat.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatList;