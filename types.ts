export interface User {
    id: string;
    name: string;
    avatarUrl: string;
    isTeamMember?: boolean;
}

export enum MessageType {
    TEXT = 'text',
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    DOCUMENT = 'document',
    SYSTEM = 'system',
}

export interface Message {
    id: string;
    senderId: string;
    content: string; // text content, or caption for media
    timestamp: Date;
    type: MessageType;
    mediaUrl?: string; // URL for media content
    fileName?: string; // for documents
}

export interface SubLabel {
    id: string;
    name: string;
}

export interface Label {
    id: string;
    name: string;
    color: string;
    subLabels: SubLabel[];
}

export interface Chat {
    id: string;
    type: 'personal' | 'group' | 'team';
    participants: User[];
    messages: Message[];
    labelIds: string[];
    name?: string; // for group chats
    avatarUrl?: string; // for group chats
}

// FIX: Added ConnectionType for use in the login flow as it was not defined anywhere.
export type ConnectionType = 'primary' | 'secondary';
