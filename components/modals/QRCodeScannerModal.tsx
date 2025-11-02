import React from 'react';
import { XIcon } from '../../assets/icons';

interface QRCodeScannerModalProps {
    onClose: () => void;
    onScanSuccess: () => void;
}

const QRCodeScannerModal: React.FC<QRCodeScannerModalProps> = ({ onClose, onScanSuccess }) => {
    
    // In a real application, you would use a library like 'react-qr-reader'
    // or 'html5-qrcode' to handle the camera and scanning logic.
    const handleSimulateScan = () => {
        alert("QR Code Scanned Successfully! (Simulated)");
        onScanSuccess();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <XIcon className="w-6 h-6" />
                </button>
                
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Scan QR Code</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Open WhatsApp on your main phone, go to <strong>Settings</strong> &gt; <strong>Linked Devices</strong> and scan the code.
                </p>

                <div className="w-full aspect-square bg-gray-900 rounded-md flex items-center justify-center text-gray-400">
                    {/* This div would be replaced by the camera feed from a QR scanner library */}
                    <p>Camera Feed Placeholder</p>
                </div>
                
                <div className="mt-4 text-center">
                    <button
                        onClick={handleSimulateScan}
                        className="px-4 py-2 bg-wa-blue text-white rounded-lg hover:bg-blue-600"
                    >
                        Simulate Successful Scan
                    </button>
                    <p className="text-xs text-gray-500 mt-2">(For demo purposes)</p>
                </div>
            </div>
        </div>
    );
};

export default QRCodeScannerModal;