'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { LeadTimeSelector } from '@/components/LeadTimeSelector';
import { StatsOverview } from '@/components/StatsOverview';
import { WeatherMap } from '@/components/WeatherMap';
import { RiskLegend } from '@/components/RiskLegend';
import { ForecastMetadataPanel } from '@/components/ForecastMetadataPanel';
import { ExplanationPanel } from '@/components/ExplanationPanel';
import { useForecastData } from '@/hooks/useForecastData';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  const {
    leadTimeHours,
    setLeadTimeHours,
    selectedPoint,
    setSelectedPoint,
    health,
    confidenceMap,
    forecastMap,
    explanation,
    loading,
    error,
    refetch,
  } = useForecastData();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Header Bar */}
      <Header health={health} loading={loading} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Error Alert Box */}
        {error && (
          <div className="bg-rose-950/80 border border-rose-800 text-rose-200 p-4 rounded-xl shadow-xl flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-sm">Backend API Connection Error</h3>
              <p className="text-xs text-rose-300 mt-0.5">{error}</p>
              <p className="text-[11px] text-rose-400/80 mt-1">
                Make sure the FastAPI backend is running locally on <code className="bg-rose-900/50 px-1 py-0.5 rounded text-white">http://127.0.0.1:8000</code> using <code className="bg-rose-900/50 px-1 py-0.5 rounded text-white">uvicorn app.main:app --reload</code>.
              </p>
            </div>
            <button
              onClick={refetch}
              className="px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Lead Time Selector */}
        <LeadTimeSelector
          selectedHours={leadTimeHours}
          onSelectLeadTime={setLeadTimeHours}
        />

        {/* Stats Summary Cards */}
        <StatsOverview
          confidenceMap={confidenceMap}
          leadTimeHours={leadTimeHours}
        />

        {/* Map & Explanation Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <WeatherMap
              points={confidenceMap?.points || []}
              selectedPoint={selectedPoint}
              onSelectPoint={setSelectedPoint}
              loading={loading}
            />
            <RiskLegend />
          </div>

          {/* Explanation Panel Column (Span 1) */}
          <div className="space-y-4">
            <ExplanationPanel
              selectedPoint={selectedPoint}
              explanation={explanation}
            />
          </div>
        </div>

        {/* Forecast Metadata Footer Panel */}
        <ForecastMetadataPanel
          forecastMap={forecastMap}
          leadTimeHours={leadTimeHours}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>
          AI-Based Forecast Bust Detection System • National Centre for Medium Range Weather Forecasting (NCMRWF)
        </p>
        <p className="mt-1 text-[11px] text-slate-600">
          Powered by GFS NWP Grids, ERA5 Verification, XGBoost Inference, and Next.js / FastAPI Architecture.
        </p>
      </footer>
    </div>
  );
}
