
import React, { useState } from 'react';
import * as math from 'mathjs';
import { History, Delete } from 'lucide-react';
import { ThemeMode } from '../types';

interface CalculatorProps {
  accent: string;
  theme: ThemeMode;
}

const Calculator: React.FC<CalculatorProps> = ({ accent, theme }) => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const isLight = theme === 'light';

  const buttons = [
    { label: 'C', type: 'clear', color: 'bg-red-500/10 text-red-500 hover:bg-red-500/20' },
    { label: '(', type: 'op', color: isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/60 text-slate-400' },
    { label: ')', type: 'op', color: isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/60 text-slate-400' },
    { label: 'del', type: 'delete', color: isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/60 text-slate-400' },
    
    { label: 'sin', type: 'func', color: `bg-${accent}-500/10 text-${accent}-500` },
    { label: 'cos', type: 'func', color: `bg-${accent}-500/10 text-${accent}-500` },
    { label: 'tan', type: 'func', color: `bg-${accent}-500/10 text-${accent}-500` },
    { label: '/', type: 'op', color: isLight ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-500/10 text-indigo-400' },

    { label: 'log', type: 'func', color: `bg-${accent}-500/10 text-${accent}-500` },
    { label: '7', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '8', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '9', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '*', type: 'op', color: isLight ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-500/10 text-indigo-400' },

    { label: 'sqrt', type: 'func', color: `bg-${accent}-500/10 text-${accent}-500` },
    { label: '4', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '5', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '6', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '-', type: 'op', color: isLight ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-500/10 text-indigo-400' },

    { label: '^', type: 'op', color: `bg-${accent}-500/10 text-${accent}-500` },
    { label: '1', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '2', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '3', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '+', type: 'op', color: isLight ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-500/10 text-indigo-400' },

    { label: 'pi', type: 'const', color: `bg-${accent}-500/10 text-${accent}-500` },
    { label: '0', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '.', type: 'num', color: isLight ? 'bg-white text-slate-800' : 'bg-slate-800/40 text-slate-100' },
    { label: '=', type: 'equal', color: `bg-${accent}-600 text-white shadow-xl shadow-${accent}-600/20` },
  ];

  const handleInput = (label: string, type: string) => {
    if (isError) {
      setDisplay('0');
      setIsError(false);
    }

    switch (type) {
      case 'clear':
        setDisplay('0');
        break;
      case 'delete':
        setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        break;
      case 'func':
        setDisplay(prev => prev === '0' ? `${label}(` : `${prev}${label}(`);
        break;
      case 'equal':
        try {
          const result = math.evaluate(display).toString();
          setHistory(prev => [display + ' = ' + result, ...prev].slice(0, 10));
          setDisplay(result);
        } catch (e) {
          setIsError(true);
          setDisplay('Error');
        }
        break;
      default:
        setDisplay(prev => prev === '0' ? label : prev + label);
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-w-md mx-auto animate-in fade-in duration-500 pb-4">
      {/* Compact Display Area */}
      <div className={`relative mb-4 p-5 rounded-3xl border flex flex-col justify-end items-end transition-colors min-h-[140px] ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-slate-800'
      }`}>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="absolute top-4 left-4 p-2 rounded-xl text-slate-500 hover:bg-slate-800/20"
        >
          <History className="w-4 h-4" />
        </button>

        <div className="text-slate-500 text-sm math-font h-6 overflow-hidden mb-1 opacity-70">
          {history[0]?.split('=')[0] || ''}
        </div>
        <div className={`text-5xl font-bold math-font break-all text-right tracking-tight leading-tight ${
          isError ? 'text-red-400' : isLight ? 'text-slate-900' : 'text-slate-100'
        }`}>
          {display}
        </div>
      </div>

      {/* Button Grid - Optimized for Thumbs */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleInput(btn.label, btn.type)}
            className={`py-5 rounded-2xl font-bold text-lg transition-all active:scale-90 flex items-center justify-center ${btn.color} ${
              isLight && btn.type === 'num' ? 'border border-slate-100' : 'border border-transparent'
            } ${btn.type === 'equal' ? 'col-span-2' : ''}`}
          >
            {btn.label === 'del' ? <Delete className="w-6 h-6" /> : btn.label}
          </button>
        ))}
      </div>

      {/* History Drawer Overlay */}
      {showHistory && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setShowHistory(false)}>
          <div 
            className={`absolute bottom-0 left-0 right-0 max-h-[70vh] rounded-t-[2.5rem] p-6 pb-24 border-t animate-in slide-in-from-bottom duration-300 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-slate-500/20 rounded-full mx-auto mb-6"></div>
            <div className="flex items-center gap-2 mb-6">
              <History className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-lg">পূর্ববর্তী ইতিহাস (History)</h3>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-[50vh]">
              {history.length === 0 ? (
                <div className="py-12 text-center text-slate-500 italic">No history yet</div>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-800/40 border-slate-700/50'
                  }`}>
                    <div className="text-xs text-slate-500 mb-1 math-font">{item.split('=')[0]}</div>
                    <div className={`text-lg font-bold math-font text-${accent}-500`}>{item.split('=')[1]}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
