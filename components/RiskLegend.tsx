'use client';

import React from 'react';

export const RiskLegend: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-lg backdrop-blur-sm text-xs space-y-2">
      <div className="flex items-center justify-between font-semibold text-slate-300">
        <span>Bust Risk & Confidence Legend</span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800">
        {/* Bust Risk Scale */}
        <div>
          <span className="text-[10px] text-slate-400 block mb-1">Bust Probability</span>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
              <span className="text-slate-200">High Risk (&ge; 60%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              <span className="text-slate-200">Moderate Risk (30–59%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              <span className="text-slate-200">Low Risk (&lt; 30%)</span>
            </div>
          </div>
        </div>

        {/* Model Certainty Scale */}
        <div>
          <span className="text-[10px] text-slate-400 block mb-1">Model Confidence</span>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-1.5 rounded bg-cyan-400" />
              <span className="text-slate-200">High Confidence (&ge; 80%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-1.5 rounded bg-blue-400" />
              <span className="text-slate-200">Moderate (50–79%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-1.5 rounded bg-slate-500" />
              <span className="text-slate-200">Low Confidence (&lt; 50%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
