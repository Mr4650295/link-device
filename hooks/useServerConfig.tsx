import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DEFAULT_API_BASE_URL } from '../config';

interface ServerConfigContextType {
    apiBaseUrl: string;
    updateApiBaseUrl: (newUrl: string) => void;
}

const ServerConfigContext = createContext<ServerConfigContextType | undefined>(undefined);

const getStoredUrl = (): string => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem('apiBaseUrl') || DEFAULT_API_BASE_URL;
    }
    return DEFAULT_API_BASE_URL;
};

export const ServerConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [apiBaseUrl, setApiBaseUrl] = useState<string>(getStoredUrl());

    const updateApiBaseUrl = (newUrl: string) => {
        const urlToSave = newUrl.trim() || DEFAULT_API_BASE_URL;
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('apiBaseUrl', urlToSave);
        }
        setApiBaseUrl(urlToSave);
    };

    return (
        <ServerConfigContext.Provider value={{ apiBaseUrl, updateApiBaseUrl }}>
            {children}
        </ServerConfigContext.Provider>
    );
};

export const useServerConfig = (): ServerConfigContextType => {
    const context = useContext(ServerConfigContext);
    if (!context) {
        throw new Error('useServerConfig must be used within a ServerConfigProvider');
    }
    return context;
};
