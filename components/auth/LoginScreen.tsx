import React, { useState } from 'react';
// FIX: The ConnectionType was incorrectly imported from App.tsx which doesn't export it. It has been moved to types.ts and the import path is corrected.
import { ConnectionType } from '../../types';
import { QrCodeIcon } from '../../assets/icons';
import QRCodeScannerModal from '../modals/QRCodeScannerModal';

interface LoginScreenProps {
    setConnectionType: (type: ConnectionType) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setConnectionType }) => {
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handlePrimaryConnect = () => {
        // This will be called after a successful QR scan
        setConnectionType('primary');
    };

    const handleSecondaryConnect = () => {
        // Simulate a successful login to the backup server
        alert("Connecting via backup server...");
        setConnectionType('secondary');
    };

    return (
        <div className="h-screen w-screen bg-wa-teal flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-wa-bg-dark p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-wa-green-dark dark:text-wa-green mb-2">
                    OmniConnect
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Connect your device to start messaging.
                </p>
                
                <div className="space-y-4">
                    <button
                        onClick={() => setIsScannerOpen(true)}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-wa-green text-white font-semibold rounded-lg hover:bg-wa-green-dark transition-colors"
                    >
                        <QrCodeIcon className="w-6 h-6" />
                        <span>Connect Primary Device (Scan QR)</span>
                    </button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-wa-bg-dark text-gray-500">OR</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSecondaryConnect}
                        className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Connect Secondary Device (via Server)
                    </button>
                </div>
            </div>

            {isScannerOpen && (
                <QRCodeScannerModal 
                    onClose={() => setIsScannerOpen(false)}
                    onScanSuccess={handlePrimaryConnect}
                />
            )}
        </div>
    );
};

export default LoginScreen;
