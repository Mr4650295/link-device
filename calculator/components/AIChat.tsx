
import React, { useState } from 'react';
import { Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import { solveMathProblem } from '../services/geminiService';
import { ThemeMode } from '../types';

interface AIChatProps {
  accent: string;
  theme: ThemeMode;
}

const AIChat: React.FC<AIChatProps> = ({ accent, theme }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLight = theme === 'light';

  const handleSolve = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setResponse(null);
    const result = await solveMathProblem(input);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col h-full animate-in fade-in duration-500 pb-8">
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border shadow-2xl flex flex-col gap-6 transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-slate-800'
      }`}>
        <div className={`flex items-center gap-4`}>
          <div className={`p-3 rounded-2xl ${`bg-${accent}-500/10 text-${accent}-500`}`}>
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-black transition-colors ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>এআই হেল্প</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Problem Solver</p>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="আপনার প্রশ্নটি এখানে লিখুন..."
            className={`w-full h-40 border rounded-[2rem] p-6 text-base font-medium outline-none transition-all resize-none ${
              isLight 
                ? 'bg-slate-50 border-slate-100 text-slate-900 focus:ring-4 focus:ring-blue-50' 
                : 'bg-slate-950/50 border-slate-800 text-slate-100 focus:ring-4 focus:ring-slate-800/50'
            }`}
          />
          <button
            onClick={handleSolve}
            disabled={isLoading || !input.trim()}
            className={`absolute bottom-3 right-3 px-6 py-4 rounded-2xl shadow-2xl disabled:opacity-50 transition-all active:scale-95 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-white ${
              `bg-${accent}-600`
            }`}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>সমাধান</span>
          </button>
        </div>

        {response && (
          <div className={`p-6 rounded-[2rem] border animate-in slide-in-from-bottom-4 ${
            isLight ? 'bg-slate-50 border-slate-100 shadow-inner' : 'bg-slate-800/20 border-slate-800'
          }`}>
            <div className={`text-[10px] font-black mb-4 uppercase tracking-widest flex items-center gap-2 ${`text-${accent}-500`}`}>
              <Sparkles className="w-3 h-3" />
              এআই উত্তর
            </div>
            <div className={`prose prose-sm max-w-none text-sm leading-relaxed whitespace-pre-wrap font-medium ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              {response}
            </div>
          </div>
        )}

        {!response && !isLoading && (
          <div className="py-8 flex flex-col items-center justify-center opacity-20 text-center gap-3">
            <div className="p-5 rounded-full border border-dashed border-current">
              <BrainCircuit className="w-10 h-10" />
            </div>
            <p className="text-xs font-bold uppercase tracking-tighter italic">Ask anything about math</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;
