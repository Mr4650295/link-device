import React from 'react';
import { Label } from '../../types';

interface LabelPillProps {
    label: Label;
}

const LabelPill: React.FC<LabelPillProps> = ({ label }) => {
    return (
        <span
            className={`text-xs font-semibold inline-block py-1 px-2 rounded-full text-white ${label.color} last:mr-0 mr-1`}
        >
            {label.name}
        </span>
    );
};

export default LabelPill;
