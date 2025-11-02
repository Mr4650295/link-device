import React, { useState } from 'react';
import { ArrowLeftIcon } from '../../assets/icons';
import { useServerConfig } from '../../hooks/useServerConfig';

interface SettingsScreenProps {
    onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
    const { apiBaseUrl, updateApiBaseUrl } = useServerConfig();
    const [customUrl, setCustomUrl] = useState(apiBaseUrl);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateApiBaseUrl(customUrl);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000); // Hide message after 2 seconds
    };

    return (
        <div className="h-screen w-screen bg-wa-bg-light dark:bg-wa-bg-dark flex flex-col">
            <header className="flex-shrink-0 flex items-center p-3 bg-gray-100 dark:bg-wa-msg-dark border-b border-gray-200 dark:border-gray-700">
                <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-semibold">Settings</h2>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-md mx-auto bg-white dark:bg-wa-msg-dark p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Server Configuration</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Change the server address for the application. Leave empty to restore the default setting.
                    </p>
                    
                    <div className="space-y-2">
                        <label htmlFor="server-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Custom Server URL
                        </label>
                        <input
                            id="server-url"
                            type="text"
                            value={customUrl}
                            onChange={(e) => setCustomUrl(e.target.value)}
                            placeholder="e.g., https://my-server.com"
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-wa-green"
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-end space-x-3">
                         {saved && <span className="text-sm text-green-500">Saved!</span>}
                        <button
                            onClick={onBack}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-wa-green text-white rounded-lg hover:bg-wa-green-dark"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;
