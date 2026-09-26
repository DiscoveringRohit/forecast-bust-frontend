'use client';

import React from 'react';
import { ShieldAlert, Cpu, BarChart2, Info, Lock } from 'lucide-react';
import { ConfidenceMapPoint, ExplanationResponse } from '@/types/api';

interface ExplanationPanelProps {
  selectedPoint: ConfidenceMapPoint | null;
  explanation: ExplanationResponse | null;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  selectedPoint,
  explanation,
}) => {
  if (!selectedPoint) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-sm flex flex-col items-center justify-center min-h-[300px] text-center">
        <Info className="w-8 h-8 text-slate-500 mb-2 animate-bounce" />
        <p className="text-slate-300 font-semibold text-sm">Select a Region on Map</p>
        <p className="text-slate-500 text-xs mt-1">
          Click any point on the India interactive grid map to view regional forecast bust probability, expected error, and meteorological drivers.
        </p>
      </div>
    );
  }

  const prob = selectedPoint.bust_probability;
  const probPct = (prob * 100).toFixed(1);
  const confPct = (selectedPoint.confidence * 100).toFixed(1);

  const getRiskBadge = (p: number) => {
    if (p >= 0.6) {
      return {
        label: 'High Bust Risk',
        bgColor: 'bg-rose-950/80 text-rose-400 border-rose-800/80',
      };
    }
    if (p >= 0.3) {
      return {
        label: 'Moderate Risk',
        bgColor: 'bg-amber-950/80 text-amber-400 border-amber-800/80',
      };
    }
    return {
      label: 'Low Bust Risk',
      bgColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80',
    };
  };

  const riskInfo = getRiskBadge(prob);
  const importances = explanation?.global_feature_importances || {};

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-sm space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-slate-100">
            Regional Bust Risk & Explanation
          </h3>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${riskInfo.bgColor}`}>
          {riskInfo.label}
        </span>
      </div>

      {/* Selected Coordinate Details */}
      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400 block text-[10px]">Location Coordinates</span>
          <span className="font-bold text-slate-200">
            {selectedPoint.latitude.toFixed(2)}°N, {selectedPoint.longitude.toFixed(2)}°E
          </span>
        </div>
        <div className="text-right">
          <span className="text-slate-400 block text-[10px]">Lead Time Target</span>
          <span className="font-bold text-cyan-400">+{selectedPoint.lead_time_hours} Hours</span>
        </div>
      </div>

      {/* Bust Probability & Expected Error Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Bust Probability</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-rose-400">{probPct}%</span>
            <span className="text-[10px] text-slate-500 font-mono">P(Bust=1)</span>
          </div>
          {/* Gauge Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, prob * 100))}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Expected Forecast Error</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-100">
              {selectedPoint.expected_error_mm.toFixed(1)} <span className="text-xs text-slate-400">mm</span>
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">Conf: {confPct}%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-2">
            GFS Forecast: {selectedPoint.forecast_precipitation_mm.toFixed(1)} mm
          </span>
        </div>
      </div>

      {/* Contributing Features (Model Attribution) */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-300">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          <span>Key Contributing Factors (Model Feature Importance)</span>
        </div>

        <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
          {Object.entries(importances)
            .slice(0, 4)
            .map(([feat, weight]) => (
              <div key={feat} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300 capitalize">
                    {feat.replace(/_/g, ' ')}
                  </span>
                  <span className="text-cyan-400 font-mono font-semibold">
                    {(weight * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full"
                    style={{ width: `${Math.max(4, weight * 100)}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Historical Analog Information (Pending Backend Feature) */}
      <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 text-xs space-y-1.5">
        <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Historical Analog Match (Pending Backend Capability)</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Historical pattern matching (finding top-3 historical monsoon forecast busts under similar synoptic flow) is scheduled for Phase 8 backend integration.
        </p>
      </div>
    </div>
  );
};
