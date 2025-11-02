import React, { useState, useRef } from 'react';
import { PaperclipIcon, MicIcon, SendIcon, TrashIcon } from '../../assets/icons';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { MessageType } from '../../types';
import FilePreviewModal from '../modals/FilePreviewModal';

interface MessageInputProps {
    onSendMessage: (content: string, type: MessageType, file?: File) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [text, setText] = useState('');
    const [fileToPreview, setFileToPreview] = useState<File | null>(null);
    const { isRecording, startRecording, stopRecording, cancelRecording, recordingTime } = useVoiceRecorder();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text, MessageType.TEXT);
            setText('');
        }
    };

    const handleMicClick = async () => {
        if (isRecording) {
            const audioBlob = await stopRecording();
            if (audioBlob) {
                const audioFile = new File([audioBlob], `voice-message-${Date.now()}.webm`, { type: 'audio/webm' });
                // For voice messages, we can send them directly or also show a preview.
                // For simplicity, sending directly for now.
                onSendMessage('', MessageType.AUDIO, audioFile);
            }
        } else {
            startRecording();
        }
    };

    const handleAttachmentClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
           setFileToPreview(file);
        }
        // Reset file input to allow selecting the same file again
        event.target.value = '';
    };

    const handleSendFile = (file: File, caption: string) => {
        const type = file.type.startsWith('image/') ? MessageType.IMAGE : MessageType.DOCUMENT;
        onSendMessage(caption, type, file);
        setFileToPreview(null);
    };
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <>
            <div className="p-3 bg-gray-100 dark:bg-wa-bg-dark flex items-center">
                <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
                <button onClick={handleAttachmentClick} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <PaperclipIcon className="w-6 h-6" />
                </button>

                <div className="flex-1 mx-2">
                    {isRecording ? (
                        <div className="flex items-center justify-between w-full h-10 px-3 rounded-full bg-white dark:bg-wa-msg-dark">
                            <div className="flex items-center">
                                <MicIcon className="w-5 h-5 text-red-500 animate-pulse" />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{formatTime(recordingTime)}</span>
                            </div>
                            <button onClick={cancelRecording} className="text-gray-500 dark:text-gray-400 hover:text-red-500">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder="Type a message"
                            className="w-full h-10 px-4 rounded-full bg-white dark:bg-wa-msg-dark focus:outline-none"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                    )}
                </div>

                <button
                    onClick={text ? handleSend : handleMicClick}
                    className="p-2 rounded-full text-white bg-wa-green hover:bg-wa-green-dark"
                >
                    {text ? <SendIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
                </button>
            </div>
            {fileToPreview && (
                <FilePreviewModal
                    file={fileToPreview}
                    onClose={() => setFileToPreview(null)}
                    onSend={handleSendFile}
                />
            )}
        </>
    );
};

export default MessageInput;