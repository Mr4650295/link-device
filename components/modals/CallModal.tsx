import React from 'react';

interface CallModalProps {
    onClose: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Calling Unavailable</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    To make a call, please use your main phone. This feature is not available through the app.
                </p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-wa-green text-white rounded-lg hover:bg-wa-green-dark focus:outline-none"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallModal;
