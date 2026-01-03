
import React, { useState, useEffect } from 'react';
import { Thermometer, ArrowRightLeft } from 'lucide-react';
import { TemperatureUnit, ThemeMode } from '../types';

interface TempProps {
  accent: string;
  theme: ThemeMode;
}

const TemperatureConverter: React.FC<TempProps> = ({ accent, theme }) => {
  const [value, setValue] = useState<string>('0');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('Celsius');
  const [toUnit, setToUnit] = useState<TemperatureUnit>('Fahrenheit');
  const [result, setResult] = useState<number>(32);

  const isLight = theme === 'light';

  const convert = (val: number, from: TemperatureUnit, to: TemperatureUnit): number => {
    let celsius = 0;
    if (from === 'Celsius') celsius = val;
    else if (from === 'Fahrenheit') celsius = (val - 32) * (5/9);
    else if (from === 'Kelvin') celsius = val - 273.15;

    if (to === 'Celsius') return celsius;
    if (to === 'Fahrenheit') return (celsius * 9/5) + 32;
    if (to === 'Kelvin') return celsius + 273.15;
    return 0;
  };

  useEffect(() => {
    const numValue = parseFloat(value) || 0;
    setResult(convert(numValue, fromUnit, toUnit));
  }, [value, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col h-full animate-in fade-in duration-500">
      <div className={`p-8 rounded-[2.5rem] border shadow-2xl transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-slate-800'
      }`}>
        <div className={`flex items-center gap-4 mb-10`}>
          <div className={`p-3 rounded-2xl ${`bg-${accent}-500/10 text-${accent}-500`}`}>
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-black transition-colors ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>তাপমাত্রা</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Conversion</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              <input
                type="number"
                inputMode="decimal"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-full border rounded-2xl px-6 py-5 text-3xl font-bold math-font focus:ring-4 outline-none transition-all ${
                  isLight 
                    ? 'bg-slate-50 border-slate-100 text-slate-900 focus:ring-blue-50' 
                    : 'bg-slate-800/40 border-slate-700 text-slate-100 focus:ring-slate-800/50'
                }`}
                placeholder="0"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as TemperatureUnit)}
                className={`w-full border rounded-2xl px-6 py-4 font-bold text-sm outline-none cursor-pointer appearance-none transition-colors ${
                  isLight 
                    ? 'bg-slate-100 border-slate-200 text-slate-700' 
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <option value="Celsius">Celsius (°C)</option>
                <option value="Fahrenheit">Fahrenheit (°F)</option>
                <option value="Kelvin">Kelvin (K)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full h-px ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}></div>
            </div>
            <button
              onClick={swapUnits}
              className={`relative z-10 p-4 rounded-2xl transition-all active:rotate-180 active:scale-90 shadow-xl ${
                isLight 
                  ? 'bg-white border border-slate-100 text-slate-400' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <ArrowRightLeft className="w-5 h-5 rotate-90" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              <div className={`w-full border border-dashed rounded-2xl px-6 py-5 text-3xl font-black math-font transition-colors ${
                isLight 
                  ? 'bg-slate-50 border-slate-200 text-slate-900 shadow-inner' 
                  : 'bg-slate-950 border-slate-800/50 text-slate-100'
              }`}>
                <span className={`text-${accent}-500`}>{result.toFixed(2)}</span>
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as TemperatureUnit)}
                className={`w-full border rounded-2xl px-6 py-4 font-bold text-sm outline-none cursor-pointer appearance-none transition-colors ${
                  isLight 
                    ? 'bg-slate-100 border-slate-200 text-slate-700' 
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <option value="Celsius">Celsius (°C)</option>
                <option value="Fahrenheit">Fahrenheit (°F)</option>
                <option value="Kelvin">Kelvin (K)</option>
              </select>
            </div>
          </div>
        </div>

        <div className={`mt-10 p-6 rounded-3xl border transition-colors ${
          isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-800/20 border-slate-800/50'
        }`}>
          <h4 className={`text-[10px] font-black mb-1 uppercase tracking-widest ${`text-${accent}-500`}`}>Formula</h4>
          <p className="text-xs text-slate-500 font-medium italic">
            {fromUnit === toUnit ? 'No change.' : 
             fromUnit === 'Celsius' && toUnit === 'Fahrenheit' ? '(°C × 9/5) + 32' :
             fromUnit === 'Fahrenheit' && toUnit === 'Celsius' ? '(°F − 32) × 5/9' :
             fromUnit === 'Celsius' && toUnit === 'Kelvin' ? '°C + 273.15' :
             fromUnit === 'Kelvin' && toUnit === 'Celsius' ? 'K − 273.15' :
             'Calculation applied.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
