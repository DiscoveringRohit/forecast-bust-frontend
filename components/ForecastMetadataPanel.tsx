'use client';

import React from 'react';
import { Database, Clock, Calendar, Compass } from 'lucide-react';
import { ForecastMapResponse } from '@/types/api';

interface ForecastMetadataPanelProps {
  forecastMap: ForecastMapResponse | null;
  leadTimeHours: number;
}

export const ForecastMetadataPanel: React.FC<ForecastMetadataPanelProps> = ({
  forecastMap,
  leadTimeHours,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-sm">
      <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 mb-3">
        <Database className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-slate-200">
          NWP Forecast Metadata
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Forecast Source */}
        <div className="flex items-start space-x-2.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
          <Database className="w-4 h-4 text-blue-400 mt-0.5" />
          <div>
            <span className="text-slate-400 block text-[10px]">Forecast Source</span>
            <span className="font-semibold text-slate-200">GFS 0.25° Global Grid (NOAA)</span>
          </div>
        </div>

        {/* Initialization Time */}
        <div className="flex items-start space-x-2.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
          <Clock className="w-4 h-4 text-emerald-400 mt-0.5" />
          <div>
            <span className="text-slate-400 block text-[10px]">Initialization Time</span>
            <span className="font-semibold text-slate-200">
              {forecastMap?.initialization_time || '2024-06-01 00:00 UTC'}
            </span>
          </div>
        </div>

        {/* Target Valid Time */}
        <div className="flex items-start space-x-2.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
          <Calendar className="w-4 h-4 text-purple-400 mt-0.5" />
          <div>
            <span className="text-slate-400 block text-[10px]">Valid Forecast Time</span>
            <span className="font-semibold text-slate-200">
              {forecastMap?.valid_time || `+${leadTimeHours}h Target`}
            </span>
          </div>
        </div>

        {/* Verification Source */}
        <div className="flex items-start space-x-2.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
          <Compass className="w-4 h-4 text-amber-400 mt-0.5" />
          <div>
            <span className="text-slate-400 block text-[10px]">Verification Source</span>
            <span className="font-semibold text-slate-200">ERA5 Reanalysis (ECMWF CDS)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
