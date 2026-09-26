'use client';

import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ConfidenceMapPoint } from '@/types/api';

interface MapContainerWrapperProps {
  points: ConfidenceMapPoint[];
  selectedPoint: ConfidenceMapPoint | null;
  onSelectPoint: (point: ConfidenceMapPoint) => void;
}

export const MapContainerWrapper: React.FC<MapContainerWrapperProps> = ({
  points,
  selectedPoint,
  onSelectPoint,
}) => {
  // Bounding box rectangle for India region (0°N to 40°N, 60°E to 100°E)
  const indiaBounds: [[number, number], [number, number]] = [
    [0.0, 60.0],
    [40.0, 100.0],
  ];

  const getMarkerStyle = (point: ConfidenceMapPoint) => {
    const isSelected =
      selectedPoint &&
      selectedPoint.latitude === point.latitude &&
      selectedPoint.longitude === point.longitude;

    const prob = point.bust_probability;

    let color = '#34d399'; // Low risk - Emerald
    let radius = 5;

    if (prob >= 0.6) {
      color = '#f43f5e'; // High risk - Rose
      radius = 7;
    } else if (prob >= 0.3) {
      color = '#fbbf24'; // Moderate risk - Amber
      radius = 6;
    }

    return {
      pathOptions: {
        fillColor: color,
        color: isSelected ? '#ffffff' : color,
        weight: isSelected ? 3 : 1,
        fillOpacity: isSelected ? 1.0 : 0.7,
      },
      radius: isSelected ? radius + 3 : radius,
    };
  };

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      minZoom={4}
      maxZoom={8}
      style={{ height: '100%', width: '100%', backgroundColor: '#020617' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* India Regional Bounding Box Indicator */}
      <Rectangle
        bounds={indiaBounds}
        pathOptions={{
          color: '#38bdf8',
          weight: 1.5,
          dashArray: '4, 4',
          fillOpacity: 0.02,
        }}
      />

      {/* Render Gridded Bust Risk Points */}
      {points.map((pt, idx) => {
        const style = getMarkerStyle(pt);
        return (
          <CircleMarker
            key={`${pt.latitude}-${pt.longitude}-${idx}`}
            center={[pt.latitude, pt.longitude]}
            radius={style.radius}
            pathOptions={style.pathOptions}
            eventHandlers={{
              click: () => onSelectPoint(pt),
            }}
          >
            <Tooltip direction="top" offset={[0, -5]} opacity={0.95}>
              <div className="text-xs space-y-1 font-sans">
                <div className="font-bold text-slate-100">
                  {pt.latitude.toFixed(2)}°N, {pt.longitude.toFixed(2)}°E
                </div>
                <div className="text-rose-400 font-semibold">
                  Bust Probability: {(pt.bust_probability * 100).toFixed(1)}%
                </div>
                <div className="text-slate-300">
                  Expected Error: {pt.expected_error_mm.toFixed(1)} mm
                </div>
                <div className="text-slate-400 text-[10px]">
                  GFS Rain: {pt.forecast_precipitation_mm.toFixed(1)} mm
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default MapContainerWrapper;
