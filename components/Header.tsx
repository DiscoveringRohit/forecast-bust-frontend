'use client';

import React from 'react';
import { Activity, ShieldAlert, Cpu } from 'lucide-react';
import { HealthResponse } from '@/types/api';

interface HeaderProps {
  health: HealthResponse | null;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ health, loading }) => {
  const isHealthy = health?.status === 'ok' && health?.model_loaded;

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Organization Title */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Forecast Bust AI
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                SIH #26079
              </span>
            </div>
            <p className="text-xs text-slate-400">
              NCMRWF / Ministry of Earth Sciences (MoES) • Medium-Range NWP Confidence Indicator
            </p>
          </div>
        </div>

        {/* Live Backend Connection Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-medium">Model: XGBoost Baseline</span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                loading
                  ? 'bg-amber-400 animate-ping'
                  : isHealthy
                  ? 'bg-emerald-400'
                  : 'bg-rose-500'
              }`}
            />
            <span className="font-semibold text-slate-200">
              {loading
                ? 'Connecting...'
                : isHealthy
                ? 'FastAPI Backend Online'
                : 'API Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
