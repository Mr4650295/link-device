
export enum AppTab {
  CALCULATOR = 'CALCULATOR',
  STOPWATCH = 'STOPWATCH',
  TEMPERATURE = 'TEMPERATURE',
  AI_ASSISTANT = 'AI_ASSISTANT'
}

export interface LapTime {
  id: number;
  time: number;
  diff: number;
}

export type TemperatureUnit = 'Celsius' | 'Fahrenheit' | 'Kelvin';

export interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: number;
}

export type ThemeMode = 'light' | 'dark';
export type AccentColor = 'blue' | 'emerald' | 'purple' | 'amber' | 'rose';

export interface AppSettings {
  theme: ThemeMode;
  accent: AccentColor;
}
