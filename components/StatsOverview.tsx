'use client';

import React from 'react';
import { AlertTriangle, MapPin, Gauge, Layers } from 'lucide-react';
import { ConfidenceMapResponse } from '@/types/api';

interface StatsOverviewProps {
  confidenceMap: ConfidenceMapResponse | null;
  leadTimeHours: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  confidenceMap,
  leadTimeHours,
}) => {
  const points = confidenceMap?.points || [];
  const maxProb = points.length > 0
    ? Math.max(...points.map((p) => p.bust_probability))
    : 0;

  const meanError = points.length > 0
    ? points.reduce((acc, p) => acc + p.expected_error_mm, 0) / points.length
    : 0;

  const highRiskCount = points.filter((p) => p.bust_probability >= 0.5).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Lead Time Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3 shadow-lg">
        <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/50">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Lead Time Target
          </span>
          <p className="text-lg font-bold text-slate-100">
            +{leadTimeHours} Hours (Day {Math.ceil(leadTimeHours / 24)})
          </p>
        </div>
      </div>

      {/* Grid Points Count */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3 shadow-lg">
        <div className="p-2.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-800/50">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Spatial Resolution
          </span>
          <p className="text-lg font-bold text-slate-100">
            {confidenceMap?.total_points || 0} Points (0.25°)
          </p>
        </div>
      </div>

      {/* Peak Regional Bust Risk */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3 shadow-lg">
        <div className="p-2.5 rounded-lg bg-rose-950 text-rose-400 border border-rose-800/50">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Peak Bust Probability
          </span>
          <p className="text-lg font-bold text-rose-400">
            {(maxProb * 100).toFixed(1)}% ({highRiskCount} Hotspots)
          </p>
        </div>
      </div>

      {/* Mean Expected Error */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3 shadow-lg">
        <div className="p-2.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/50">
          <Gauge className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Mean Expected Error
          </span>
          <p className="text-lg font-bold text-slate-100">
            {meanError.toFixed(2)} mm / day
          </p>
        </div>
      </div>
    </div>
  );
};
