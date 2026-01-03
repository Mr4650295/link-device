
import React, { useState, useEffect } from 'react';
import { AppTab, AppSettings, ThemeMode, AccentColor } from './types';
import Calculator from './components/Calculator';
import Stopwatch from './components/Stopwatch';
import TemperatureConverter from './components/TemperatureConverter';
import AIChat from './components/AIChat';
import Settings from './components/Settings';
import { Calculator as CalcIcon, Timer, Thermometer, BrainCircuit, Settings as SettingsIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CALCULATOR);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app-settings');
    return saved ? JSON.parse(saved) : { theme: 'dark', accent: 'blue' };
  });

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
    if (settings.theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const tabs = [
    { id: AppTab.CALCULATOR, label: 'ক্যালকুলেটর', icon: <CalcIcon className="w-5 h-5 sm:w-6 sm:h-6" />, desc: 'Calc' },
    { id: AppTab.STOPWATCH, label: 'স্টপওয়াচ', icon: <Timer className="w-5 h-5 sm:w-6 sm:h-6" />, desc: 'Time' },
    { id: AppTab.TEMPERATURE, label: 'তাপমাত্রা', icon: <Thermometer className="w-5 h-5 sm:w-6 sm:h-6" />, desc: 'Temp' },
    { id: AppTab.AI_ASSISTANT, label: 'এআই হেল্প', icon: <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6" />, desc: 'AI' },
  ];

  const accentClass = settings.accent;

  const getAccentBg = (weight: number = 600) => `bg-${accentClass}-${weight}`;

  return (
    <div className={`min-h-[100dvh] transition-colors duration-500 flex flex-col overflow-hidden ${settings.theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-5%] left-[-5%] w-[60%] h-[40%] rounded-full blur-[100px] opacity-15 ${getAccentBg()}`}></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px] opacity-10"></div>
      </div>

      {/* Header - Compact for Mobile */}
      <header className="relative z-20 px-4 pt-6 pb-2 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className={`text-xl font-black bg-gradient-to-r from-${accentClass}-400 to-indigo-400 bg-clip-text text-transparent tracking-tight leading-none`}>
            বিজ্ঞানী
          </h1>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-50">Companion</p>
        </div>
        
        <button 
          onClick={() => setShowSettings(true)}
          className={`p-2.5 rounded-xl border transition-all active:scale-90 ${
            settings.theme === 'light' 
              ? 'bg-white border-slate-200 text-slate-600 shadow-sm' 
              : 'bg-slate-900/50 border-slate-800 text-slate-400'
          }`}
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-start overflow-y-auto pb-24 pt-2">
        <div className="w-full h-full max-w-lg mx-auto px-3">
          {activeTab === AppTab.CALCULATOR && <Calculator accent={accentClass} theme={settings.theme} />}
          {activeTab === AppTab.STOPWATCH && <Stopwatch accent={accentClass} theme={settings.theme} />}
          {activeTab === AppTab.TEMPERATURE && <TemperatureConverter accent={accentClass} theme={settings.theme} />}
          {activeTab === AppTab.AI_ASSISTANT && <AIChat accent={accentClass} theme={settings.theme} />}
        </div>
      </main>

      {/* Bottom Navigation - Mobile Optimized */}
      <nav className={`fixed bottom-0 left-0 right-0 z-30 px-4 pb-6 pt-3 backdrop-blur-xl border-t transition-colors ${
        settings.theme === 'light' ? 'bg-white/80 border-slate-100 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]' : 'bg-slate-950/80 border-slate-900 shadow-[0_-8px_30px_rgb(0,0,0,0.2)]'
      }`}>
        <div className="flex items-center justify-around max-w-md mx-auto relative">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group px-2 py-1 ${
                  isActive ? `text-${accentClass}-500 scale-110` : 'text-slate-500 hover:text-slate-400'
                }`}
              >
                <div className={`p-2 rounded-2xl transition-all ${
                  isActive ? `bg-${accentClass}-500/10` : 'group-hover:bg-slate-800/10'
                }`}>
                  {tab.icon}
                </div>
                <span className="text-[10px] font-bold tracking-wide uppercase">{tab.desc}</span>
                {isActive && (
                  <div className={`absolute -bottom-1 w-1 h-1 rounded-full bg-${accentClass}-500`}></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {showSettings && (
        <Settings 
          settings={settings} 
          updateSettings={updateSettings} 
          onClose={() => setShowSettings(false)} 
        />
      )}
    </div>
  );
};

export default App;
