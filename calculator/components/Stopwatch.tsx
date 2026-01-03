
import React, { useState, useEffect, useRef } from 'react';
// Added 'Timer' to the imported icons from 'lucide-react'
import { Play, Pause, RotateCcw, Flag, Timer } from 'lucide-react';
import { LapTime, ThemeMode } from '../types';

interface StopwatchProps {
  accent: string;
  theme: ThemeMode;
}

const Stopwatch: React.FC<StopwatchProps> = ({ accent, theme }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<LapTime[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isLight = theme === 'light';

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    const lastLapTime = laps.length > 0 ? laps[0].time : 0;
    const newLap: LapTime = {
      id: laps.length + 1,
      time: time,
      diff: time - lastLapTime
    };
    setLaps([newLap, ...laps]);
  };

  return (
    <div className="flex flex-col w-full h-full max-w-md mx-auto animate-in fade-in duration-500 pb-8">
      {/* Big Hero Timer */}
      <div className={`mb-6 p-10 rounded-[2.5rem] border shadow-2xl text-center transition-colors flex flex-col items-center justify-center min-h-[220px] ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-slate-800'
      }`}>
        <div className={`text-6xl font-black math-font tracking-tighter mb-10 transition-colors tabular-nums ${`text-${accent}-500`}`}>
          {formatTime(time)}
        </div>

        <div className="flex justify-center items-center gap-6">
          <button
            onClick={handleReset}
            className={`p-4 rounded-2xl transition-all active:scale-90 ${
              isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/80 text-slate-300'
            }`}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleStartStop}
            className={`p-7 rounded-[2rem] transition-all active:scale-90 shadow-2xl ${
              isRunning 
                ? 'bg-amber-500 text-white' 
                : `bg-${accent}-600 text-white`
            }`}
          >
            {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current translate-x-1" />}
          </button>

          <button
            onClick={handleLap}
            disabled={!isRunning}
            className={`p-4 rounded-2xl transition-all active:scale-90 disabled:opacity-30 ${
              isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/80 text-slate-300'
            }`}
          >
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Lap History - Takes remaining space */}
      <div className={`rounded-3xl p-6 flex-1 overflow-hidden flex flex-col transition-colors border ${
        isLight ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 font-black uppercase tracking-widest text-[10px]">রেকর্ড (Laps)</h3>
          <span className="bg-slate-500/10 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold">{laps.length} LAPS</span>
        </div>
        
        <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {laps.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center opacity-30 text-center">
              <Timer className="w-10 h-10 mb-2" />
              <p className="text-sm font-medium italic">রেকর্ড শুরু করুন</p>
            </div>
          ) : (
            laps.map((lap) => (
              <div key={lap.id} className={`flex items-center justify-between p-4 rounded-2xl border animate-in slide-in-from-top-2 ${
                isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-800/40 border-slate-700/50'
              }`}>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-black text-[10px] w-6">#{lap.id}</span>
                  <span className={`math-font font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{formatTime(lap.time)}</span>
                </div>
                <span className={`text-xs font-bold math-font ${`text-${accent}-500`}`}>+{formatTime(lap.diff)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
