
import React from 'react';
import { Settings as SettingsIcon, X, Moon, Sun, Check } from 'lucide-react';
import { ThemeMode, AccentColor, AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, updateSettings, onClose }) => {
  const accents: { name: AccentColor; color: string }[] = [
    { name: 'blue', color: 'bg-blue-500' },
    { name: 'emerald', color: 'bg-emerald-500' },
    { name: 'purple', color: 'bg-purple-500' },
    { name: 'amber', color: 'bg-amber-500' },
    { name: 'rose', color: 'bg-rose-500' },
  ];

  const isLight = settings.theme === 'light';

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className={`w-full rounded-t-[2.5rem] border-t overflow-hidden animate-in slide-in-from-bottom duration-300 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        {/* Header Handle */}
        <div className="w-12 h-1.5 bg-slate-500/20 rounded-full mx-auto mt-4 mb-2"></div>

        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
              <SettingsIcon className="w-5 h-5 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold">সেটিংস</h2>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-10 pb-12">
          {/* Theme Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">থিম (Theme)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all ${
                  settings.theme === 'dark' 
                    ? `bg-${settings.accent}-500/10 border-${settings.accent}-500 text-${settings.accent}-400` 
                    : 'bg-slate-800/40 border-slate-700 text-slate-400'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span className="font-bold">ডার্ক</span>
              </button>
              <button
                onClick={() => updateSettings({ theme: 'light' })}
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all ${
                  settings.theme === 'light' 
                    ? 'bg-blue-500/10 border-blue-500 text-blue-600' 
                    : isLight ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-800/40 border-slate-700 text-slate-400'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span className="font-bold">লাইট</span>
              </button>
            </div>
          </section>

          {/* Accent Color Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">রঙ (Accent Color)</h3>
            <div className="flex items-center justify-between gap-2 px-1">
              {accents.map((acc) => (
                <button
                  key={acc.name}
                  onClick={() => updateSettings({ accent: acc.name })}
                  className={`w-12 h-12 rounded-2xl ${acc.color} flex items-center justify-center transition-all active:scale-90 shadow-lg relative`}
                >
                  {settings.accent === acc.name && (
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <Check className="w-3 h-3 text-slate-900" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
