'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ConfidenceMapPoint } from '@/types/api';
import { MapPin, Loader2 } from 'lucide-react';

// Dynamic import with SSR disabled for Leaflet client-side map rendering
const MapContainerWrapper = dynamic(
  () => import('./MapContainerWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center text-slate-400 text-xs">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mb-2" />
        <span>Loading Interactive India Map Grid...</span>
      </div>
    ),
  }
);

interface WeatherMapProps {
  points: ConfidenceMapPoint[];
  selectedPoint: ConfidenceMapPoint | null;
  onSelectPoint: (point: ConfidenceMapPoint) => void;
  loading: boolean;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({
  points,
  selectedPoint,
  onSelectPoint,
  loading,
}) => {
  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-[1000] flex flex-col items-center justify-center text-slate-200">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-2" />
          <span className="text-xs font-semibold">Updating Spatial Forecast Map...</span>
        </div>
      )}

      {/* Map Header Overlay badge */}
      <div className="absolute top-3 left-3 z-[400] bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold text-slate-200 flex items-center space-x-2">
        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
        <span>India & Surrounding Region (0°N–40°N, 60°E–100°E)</span>
      </div>

      <MapContainerWrapper
        points={points}
        selectedPoint={selectedPoint}
        onSelectPoint={onSelectPoint}
      />
    </div>
  );
};
