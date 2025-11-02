import { User, Label, Chat, MessageType, SubLabel } from '../types';

// Users
export const users: User[] = [
    { id: 'u1', name: 'My Business WA', avatarUrl: 'https://picsum.photos/seed/wa-biz/200/200', isTeamMember: true },
    { id: 'u2', name: 'Nusrat Jahan', avatarUrl: 'https://picsum.photos/seed/u2/200/200' },
    { id: 'u3', name: 'Rahim Ahmed', avatarUrl: 'https://picsum.photos/seed/u3/200/200' },
    { id: 'u4', name: 'Fatima Begum', avatarUrl: 'https://picsum.photos/seed/u4/200/200' },
    { id: 'u5', name: 'Agent Jones', avatarUrl: 'https://picsum.photos/seed/u5/200/200', isTeamMember: true },
    { id: 'u6', name: 'Internal Support', avatarUrl: 'https://picsum.photos/seed/u6/200/200', isTeamMember: true },
];

// Labels
export const mockLabels: Label[] = [
    { id: 'l1', name: 'New Customer', color: 'bg-blue-500', subLabels: [] },
    {
        id: 'l2', name: 'Sales', color: 'bg-green-500', subLabels: [
            { id: 'sl2-1', name: 'Hot Lead' },
            { id: 'sl2-2', name: 'Cold Lead' },
            { id: 'sl2-3', name: 'Negotiation' },
        ]
    },
    { id: 'l3', name: 'VIP', color: 'bg-yellow-500', subLabels: [] },
    { id: 'l4', name: 'Payment Due', color: 'bg-red-500', subLabels: [] },
    { id: 'l5', name: 'Support', color: 'bg-purple-500', subLabels: [] },
];


// Chats
export const mockChats: Chat[] = [
    {
        id: 'c1',
        type: 'personal',
        participants: [users[0], users[1]],
        labelIds: ['l1', 'l2'],
        messages: [
            { id: 'm1', senderId: 'u2', content: 'হ্যালো, আমি আপনাদের নতুন প্রোডাক্ট সম্পর্কে জানতে চাই।', timestamp: new Date(Date.now() - 1000 * 60 * 5), type: MessageType.TEXT },
            { id: 'm2', senderId: 'u1', content: 'অবশ্যই! আমাদের নতুন OmniConnect প্ল্যাটফর্মটি আপনার ব্যবসায়ের জন্য সেরা সমাধান। আপনি কি জানতে চান?', timestamp: new Date(Date.now() - 1000 * 60 * 4), type: MessageType.TEXT },
            { id: 'm3', senderId: 'u2', content: 'এটার দাম কত?', timestamp: new Date(Date.now() - 1000 * 60 * 3), type: MessageType.TEXT },
            { id: 'm4', senderId: 'u2', content: 'এই মডেলটা কি স্টকে আছে?', timestamp: new Date(Date.now() - 1000 * 60 * 2), type: MessageType.IMAGE, mediaUrl: 'https://picsum.photos/seed/img1/400/300' },
        ]
    },
    {
        id: 'c2',
        type: 'personal',
        participants: [users[0], users[2]],
        labelIds: ['l3'],
        messages: [
            { id: 'm5', senderId: 'u3', content: 'আমার অ্যাকাউন্টে একটি সমস্যা হয়েছে।', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), type: MessageType.TEXT },
            { id: 'm6', senderId: 'u1', content: 'দুঃখিত আপনার সমস্যার জন্য। আপনার অ্যাকাউন্ট নম্বরটি দিন।', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), type: MessageType.TEXT },
        ]
    },
    {
        id: 'c3',
        type: 'personal',
        participants: [users[0], users[3]],
        labelIds: ['l4'],
        messages: [
            { id: 'm7', senderId: 'u4', content: 'আমার পেমেন্ট এখনো বাকি আছে?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), type: MessageType.TEXT },
            { id: 'm8', senderId: 'u1', content: 'আমি চেক করে জানাচ্ছি।', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), type: MessageType.TEXT },
            { id: 'm9', senderId: 'u1', content: 'আপনার ইনভয়েসটি এখানে।', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), type: MessageType.DOCUMENT, mediaUrl: 'https://example.com/invoice.pdf', fileName: 'invoice.pdf' },
        ]
    },
    {
        id: 'c4',
        type: 'team',
        name: 'Team Discussion',
        avatarUrl: 'https://picsum.photos/seed/team/200/200',
        participants: [users[0], users[4], users[5]],
        labelIds: [],
        messages: [
            { id: 'm10', senderId: 'u1', content: 'Team, we have a new feature request from a VIP client.', timestamp: new Date(Date.now() - 1000 * 60 * 30), type: MessageType.TEXT },
            { id: 'm11', senderId: 'u5', content: 'What is it?', timestamp: new Date(Date.now() - 1000 * 60 * 29), type: MessageType.TEXT },
        ]
    }
];