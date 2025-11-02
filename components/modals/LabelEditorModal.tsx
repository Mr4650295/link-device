import React, { useState } from 'react';
import { Label, SubLabel } from '../../types';
import { PlusIcon, EditIcon, TrashIcon } from '../../assets/icons';

interface LabelEditorModalProps {
    allLabels: Label[];
    onClose: () => void;
    onSave: (labels: Label[]) => void;
}

const colorOptions = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'
];

const LabelEditorModal: React.FC<LabelEditorModalProps> = ({ allLabels, onClose, onSave }) => {
    const [labels, setLabels] = useState<Label[]>(JSON.parse(JSON.stringify(allLabels)));
    const [newLabelName, setNewLabelName] = useState('');
    const [newLabelColor, setNewLabelColor] = useState(colorOptions[0]);
    const [editingLabelId, setEditingLabelId] = useState<string | null>(null);

    const handleAddLabel = () => {
        if (newLabelName.trim()) {
            const newLabel: Label = {
                id: `l${Date.now()}`,
                name: newLabelName,
                color: newLabelColor,
                subLabels: [],
            };
            setLabels([...labels, newLabel]);
            setNewLabelName('');
            setNewLabelColor(colorOptions[0]);
        }
    };

    const handleDeleteLabel = (labelId: string) => {
        setLabels(labels.filter(label => label.id !== labelId));
    };

    const handleUpdateLabel = (labelId: string, newName: string, newColor: string) => {
        setLabels(labels.map(label => 
            label.id === labelId ? { ...label, name: newName, color: newColor } : label
        ));
        setEditingLabelId(null);
    };

    const handleSubLabelChange = (parentLabelId: string, updatedSubLabels: SubLabel[]) => {
         setLabels(labels.map(label => 
            label.id === parentLabelId ? { ...label, subLabels: updatedSubLabels } : label
        ));
    };

    const handleSave = () => {
        onSave(labels);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
                <header className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold">Manage All Labels</h2>
                    <p className="text-sm text-gray-500">Create, edit, or delete labels and sub-labels.</p>
                </header>

                <div className="p-4 overflow-y-auto space-y-4">
                    {/* Add new label form */}
                    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h3 className="font-semibold mb-2">Create New Label</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <input
                                type="text"
                                placeholder="Label name"
                                value={newLabelName}
                                onChange={(e) => setNewLabelName(e.target.value)}
                                className="flex-grow px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
                            />
                            <div className="flex items-center gap-2">
                                {colorOptions.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setNewLabelColor(color)}
                                        className={`w-6 h-6 rounded-full ${color} ${newLabelColor === color ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800' : ''}`}
                                        aria-label={`Select ${color}`}
                                    />
                                ))}
                            </div>
                            <button onClick={handleAddLabel} className="p-2 bg-wa-green text-white rounded-full hover:bg-wa-green-dark">
                                <PlusIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                    {/* List of existing labels */}
                    <div className="space-y-3">
                        {labels.map(label => (
                            <div key={label.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                {editingLabelId === label.id ? (
                                    <EditableLabelRow 
                                        label={label}
                                        onCancel={() => setEditingLabelId(null)}
                                        onSave={handleUpdateLabel}
                                    />
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <span className={`px-2 py-1 text-sm rounded-full text-white ${label.color}`}>
                                            {label.name}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setEditingLabelId(label.id)} className="text-gray-500 hover:text-blue-500">
                                                <EditIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDeleteLabel(label.id)} className="text-gray-500 hover:text-red-500">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <SubLabelManager 
                                    parentLabelId={label.id}
                                    subLabels={label.subLabels}
                                    onSubLabelsChange={handleSubLabelChange}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-wa-green text-white rounded-lg hover:bg-wa-green-dark">
                        Save Changes
                    </button>
                </footer>
            </div>
        </div>
    );
};

const EditableLabelRow: React.FC<{label: Label; onSave: (id: string, name: string, color: string) => void; onCancel: () => void;}> = ({ label, onSave, onCancel }) => {
    const [name, setName] = useState(label.name);
    const [color, setColor] = useState(label.color);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="flex-grow px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"/>
            <div className="flex items-center gap-2">
                {colorOptions.map(c => <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-full ${c} ${color === c ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800' : ''}`} />)}
            </div>
            <div className="flex items-center gap-2"><button onClick={onCancel} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-sm rounded-md">Cancel</button><button onClick={() => onSave(label.id, name, color)} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md">Save</button></div>
        </div>
    );
}

const SubLabelManager: React.FC<{parentLabelId: string, subLabels: SubLabel[], onSubLabelsChange: (parentLabelId: string, subLabels: SubLabel[]) => void}> = ({ parentLabelId, subLabels, onSubLabelsChange }) => {
    const [newSubLabelName, setNewSubLabelName] = useState('');
    const [editingSubLabel, setEditingSubLabel] = useState<SubLabel | null>(null);

    const handleAdd = () => {
        if (newSubLabelName.trim()) {
            const newSubLabel: SubLabel = { id: `sl${Date.now()}`, name: newSubLabelName.trim() };
            onSubLabelsChange(parentLabelId, [...subLabels, newSubLabel]);
            setNewSubLabelName('');
        }
    };
    const handleUpdate = (id: string, name: string) => {
        onSubLabelsChange(parentLabelId, subLabels.map(sl => sl.id === id ? { ...sl, name } : sl));
        setEditingSubLabel(null);
    };
    const handleDelete = (id: string) => {
        onSubLabelsChange(parentLabelId, subLabels.filter(sl => sl.id !== id));
    };

    return (
        <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
            <div className="space-y-2">
                {subLabels.map(sl => (
                    <div key={sl.id}>
                        {editingSubLabel?.id === sl.id ? (
                            <EditableSubLabelRow subLabel={sl} onSave={handleUpdate} onCancel={() => setEditingSubLabel(null)} />
                        ) : (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">{sl.name}</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setEditingSubLabel(sl)} className="text-gray-400 hover:text-blue-500"><EditIcon className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(sl.id)} className="text-gray-400 hover:text-red-500"><TrashIcon className="w-4 h-4" /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
                <input type="text" placeholder="New sub-label" value={newSubLabelName} onChange={(e) => setNewSubLabelName(e.target.value)} className="flex-grow px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"/>
                <button onClick={handleAdd} className="p-1 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500"><PlusIcon className="w-4 h-4" /></button>
            </div>
        </div>
    );
}

const EditableSubLabelRow: React.FC<{subLabel: SubLabel; onSave: (id: string, name: string) => void; onCancel: () => void}> = ({ subLabel, onSave, onCancel }) => {
    const [name, setName] = useState(subLabel.name);
    return (
        <div className="flex items-center gap-2 text-sm">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="flex-grow px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"/>
            <button onClick={onCancel} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-md">Cancel</button>
            <button onClick={() => onSave(subLabel.id, name)} className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md">Save</button>
        </div>
    );
};


export default LabelEditorModal;