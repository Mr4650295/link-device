import React from 'react';

interface AvatarProps {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    return (
        <img
            className={`rounded-full object-cover ${sizeClasses[size]}`}
            src={src}
            alt={alt}
        />
    );
};

export default Avatar;
