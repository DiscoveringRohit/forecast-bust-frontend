'use client';

import React, { useState } from 'react';
import { Calendar, ChevronRight, Lock } from 'lucide-react';

interface LeadTimeSelectorProps {
  selectedHours: number;
  onSelectLeadTime: (hours: number) => void;
}

export const LeadTimeSelector: React.FC<LeadTimeSelectorProps> = ({
  selectedHours,
  onSelectLeadTime,
}) => {
  const [showExtended, setShowExtended] = useState<boolean>(false);

  const mainDays = [
    { day: 'Day 1', hours: 24, label: '+24h Forecast' },
    { day: 'Day 2', hours: 48, label: '+48h Forecast' },
    { day: 'Day 3', hours: 72, label: '+72h Forecast' },
    { day: 'Day 4', hours: 96, label: '+96h Forecast' },
    { day: 'Day 5', hours: 120, label: '+120h Forecast' },
  ];

  const extendedDays = [
    { day: 'Day 6', hours: 144, label: '+144h' },
    { day: 'Day 7', hours: 168, label: '+168h' },
    { day: 'Day 8', hours: 192, label: '+192h' },
    { day: 'Day 9', hours: 216, label: '+216h' },
    { day: 'Day 10', hours: 240, label: '+240h' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold text-slate-200">
            Forecast Lead-Time Window
          </h2>
        </div>
        <button
          onClick={() => setShowExtended(!showExtended)}
          className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 font-medium"
        >
          <span>{showExtended ? 'Collapse to Day 1–5' : 'Expand to Day 10 (Experimental)'}</span>
          <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${showExtended ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Main Days Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {mainDays.map((item) => {
          const isSelected = selectedHours === item.hours;
          return (
            <button
              key={item.hours}
              onClick={() => onSelectLeadTime(item.hours)}
              className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-lg border transition-all ${
                isSelected
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/30 scale-[1.02]'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <span className="text-sm font-bold">{item.day}</span>
              <span className={`text-[11px] mt-0.5 ${isSelected ? 'text-cyan-100' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Extended Days Grid (Day 6 to 10) */}
      {showExtended && (
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center space-x-1.5 mb-2 text-xs text-amber-400">
            <Lock className="w-3.5 h-3.5" />
            <span>Extended Range (Day 6–10 NWP Ingestion Layer)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {extendedDays.map((item) => {
              const isSelected = selectedHours === item.hours;
              return (
                <button
                  key={item.hours}
                  onClick={() => onSelectLeadTime(item.hours)}
                  className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg border text-xs transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <span className="font-semibold">{item.day}</span>
                  <span className="text-[10px] text-slate-500">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
