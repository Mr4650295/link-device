import { useState, useRef, useCallback } from 'react';

export interface VoiceRecorderState {
    isRecording: boolean;
    startRecording: () => Promise<void>;
    stopRecording: () => Promise<Blob | null>;
    cancelRecording: () => void;
    recordingTime: number;
}

export const useVoiceRecorder = (): VoiceRecorderState => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<number | null>(null);

    const startRecording = useCallback(async () => {
        if (isRecording) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstart = () => {
                setIsRecording(true);
                setRecordingTime(0);
                audioChunksRef.current = [];
                timerRef.current = window.setInterval(() => {
                    setRecordingTime(prevTime => prevTime + 1);
                }, 1000);
            };
            
            mediaRecorder.start();

        } catch (err) {
            console.error("Error starting recording:", err);
            alert("Could not access microphone. Please check permissions.");
        }
    }, [isRecording]);

    const stopRecording = useCallback(async (): Promise<Blob | null> => {
        if (!mediaRecorderRef.current || !isRecording) return null;

        return new Promise((resolve) => {
            mediaRecorderRef.current!.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                audioChunksRef.current = [];
                setIsRecording(false);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
                // Stop all tracks on the stream
                mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
                resolve(audioBlob);
            };
            mediaRecorderRef.current!.stop();
        });

    }, [isRecording]);

    const cancelRecording = useCallback(() => {
        if (!mediaRecorderRef.current || !isRecording) return;
        
        mediaRecorderRef.current!.onstop = () => {
            audioChunksRef.current = [];
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
             mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
        };
        mediaRecorderRef.current!.stop();
    }, [isRecording]);

    return { isRecording, startRecording, stopRecording, cancelRecording, recordingTime };
};
