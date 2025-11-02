import React, { useState } from 'react';
import { Chat, Label } from '../../types';
import { PlusIcon } from '../../assets/icons';

const colorOptions = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'
];

interface LabelManagerModalProps {
    chat: Chat;
    allLabels: Label[];
    onClose: () => void;
    onSave: (labelIds: string[]) => void;
    onUpdateAllLabels: (labels: Label[]) => void;
}

const LabelManagerModal: React.FC<LabelManagerModalProps> = ({ chat, allLabels, onClose, onSave, onUpdateAllLabels }) => {
    const [selectedLabels, setSelectedLabels] = useState<string[]>(chat.labelIds);
    const [isCreating, setIsCreating] = useState(false);
    const [newLabelName, setNewLabelName] = useState('');
    const [newLabelColor, setNewLabelColor] = useState(colorOptions[0]);

    const toggleLabel = (labelId: string) => {
        setSelectedLabels(prev =>
            prev.includes(labelId) ? prev.filter(id => id !== labelId) : [...prev, labelId]
        );
    };

    const handleSave = () => {
        onSave(selectedLabels);
    };

    const handleCreateLabel = () => {
        if (newLabelName.trim()) {
            const newLabel: Label = {
                id: `l${Date.now()}`,
                name: newLabelName.trim(),
                color: newLabelColor,
                subLabels: [],
            };
            const updatedAllLabels = [...allLabels, newLabel];
            onUpdateAllLabels(updatedAllLabels); // Update global state
            setSelectedLabels(prev => [...prev, newLabel.id]); // Auto-select new label
            setNewLabelName('');
            setNewLabelColor(colorOptions[0]);
            setIsCreating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col">
                <header className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold">Manage Labels</h2>
                    <p className="text-sm text-gray-500">Apply labels to this chat</p>
                </header>
                
                <div className="p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {allLabels.map(label => (
                            <div key={label.id}>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`label-${label.id}`}
                                        className="h-4 w-4 rounded text-wa-green focus:ring-wa-green-dark"
                                        checked={selectedLabels.includes(label.id)}
                                        onChange={() => toggleLabel(label.id)}
                                    />
                                    <label htmlFor={`label-${label.id}`} className="ml-3 flex items-center cursor-pointer">
                                        <span className={`px-2 py-1 text-sm rounded-full text-white ${label.color}`}>
                                            {label.name}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        {isCreating ? (
                            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <input
                                    type="text"
                                    placeholder="New label name"
                                    value={newLabelName}
                                    onChange={(e) => setNewLabelName(e.target.value)}
                                    className="w-full px-3 py-2 mb-3 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {colorOptions.slice(0, 5).map(color => (
                                            <button key={color} onClick={() => setNewLabelColor(color)} className={`w-6 h-6 rounded-full ${color} ${newLabelColor === color ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800' : ''}`} />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setIsCreating(false)} className="text-sm text-gray-600 dark:text-gray-400">Cancel</button>
                                        <button onClick={handleCreateLabel} className="px-3 py-1 bg-wa-green text-white text-sm rounded-md">Create</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 text-wa-green dark:text-wa-blue hover:underline">
                                <PlusIcon className="w-5 h-5" />
                                <span>Create New Label</span>
                            </button>
                        )}
                    </div>
                </div>

                <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-wa-green text-white rounded-lg hover:bg-wa-green-dark"
                    >
                        Save
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default LabelManagerModal;