import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, CropIcon, RotateCcwIcon, Edit2Icon, XIcon, CheckIcon } from '../../assets/icons';

declare var Cropper: any;

interface FilePreviewModalProps {
    file: File;
    onClose: () => void;
    onSend: (file: File, caption: string) => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose, onSend }) => {
    const [caption, setCaption] = useState('');
    const [fileToSend, setFileToSend] = useState<File>(file);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isCropping, setIsCropping] = useState(false);
    const [isCropperReady, setIsCropperReady] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const cropperRef = useRef<any>(null);
    const isImage = file.type.startsWith('image/');

    useEffect(() => {
        const url = URL.createObjectURL(fileToSend);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [fileToSend]);

    useEffect(() => {
        const imageElement = imageRef.current;
        if (isCropping && imageElement && isImage) {
            const cropper = new Cropper(imageElement, {
                viewMode: 1,
                background: false,
                autoCropArea: 1,
                responsive: true,
                ready: () => {
                    setIsCropperReady(true);
                },
            });
            cropperRef.current = cropper;

            return () => {
                cropper.destroy();
                cropperRef.current = null;
                setIsCropperReady(false);
            };
        }
    }, [isCropping, isImage]);

    const handleSend = () => {
        onSend(fileToSend, caption);
    };

    const handleApplyCrop = () => {
        if (!cropperRef.current || !isCropperReady) return;

        const canvas = cropperRef.current.getCroppedCanvas();
        if (!canvas) {
            console.error("Cropper canvas is not available.");
            return;
        }

        canvas.toBlob((blob: Blob | null) => {
            if (blob) {
                const croppedFile = new File([blob], file.name, { type: file.type });
                setFileToSend(croppedFile);
                setIsCropping(false);
            }
        }, file.type);
    };

    const handleCancelCrop = () => {
        setIsCropping(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
            {/* Header */}
            <div className="w-full max-w-5xl p-4 flex justify-between items-center text-white">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20">
                    <XIcon className="w-8 h-8" />
                </button>
                {isImage && (
                    <div className="flex items-center space-x-4">
                        {isCropping ? (
                            <>
                                <button onClick={handleCancelCrop} className="p-2 rounded-full hover:bg-white/20" title="Cancel Crop">
                                    <XIcon className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleApplyCrop}
                                    disabled={!isCropperReady}
                                    className="p-2 rounded-full bg-wa-green hover:bg-wa-green-dark disabled:bg-gray-500 disabled:cursor-not-allowed"
                                    title="Apply Crop"
                                >
                                    <CheckIcon className="w-6 h-6" />
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsCropping(true)} className="p-2 rounded-full hover:bg-white/20" title="Crop">
                                    <CropIcon className="w-6 h-6" />
                                </button>
                                <button className="p-2 rounded-full text-gray-500 cursor-not-allowed" title="Rotate (coming soon)" disabled>
                                    <RotateCcwIcon className="w-6 h-6" />
                                </button>
                                <button className="p-2 rounded-full text-gray-500 cursor-not-allowed" title="Draw (coming soon)" disabled>
                                    <Edit2Icon className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center w-full overflow-hidden p-4">
                {isImage ? (
                    <div className="max-w-full max-h-full">
                        <img
                            ref={imageRef}
                            src={previewUrl}
                            alt="Preview"
                            className={isCropping ? 'block max-w-full' : 'object-contain max-w-full max-h-full'}
                            style={{ visibility: isCropping && !isCropperReady ? 'hidden' : 'visible' }}
                        />
                    </div>
                ) : (
                     <div className="p-8 bg-gray-700 rounded-lg text-white flex flex-col items-center">
                         <svg className="w-16 h-16 mb-4 fill-current" viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" /></svg>
                         <p className="text-lg font-semibold">{file.name}</p>
                         <p className="text-sm text-gray-300">{(file.size / 1024).toFixed(2)} KB</p>
                     </div>
                 )}
            </div>

            {/* Footer / Input */}
            <div className="w-full max-w-5xl p-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Add a caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="flex-1 h-12 px-4 rounded-full bg-gray-800 text-white focus:outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="ml-3 p-3 rounded-full text-white bg-wa-green hover:bg-wa-green-dark"
                    >
                        <SendIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
