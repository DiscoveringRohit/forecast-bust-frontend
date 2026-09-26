export interface PredictionRequest {
  lead_time_hours: number;
  latitude: number;
  longitude: number;
  forecast_precipitation: number;
}

export interface PredictionResponse {
  bust_probability: number;
  confidence: number;
  is_bust_predicted: boolean;
  risk_category: string;
  threshold_applied_mm: number;
  timestamp: string;
}

export interface ConfidenceMapPoint {
  lead_time_hours: number;
  latitude: number;
  longitude: number;
  bust_probability: number;
  confidence: number;
  expected_error_mm: number;
  forecast_precipitation_mm: number;
}

export interface ConfidenceMapResponse {
  lead_time_hours: number;
  total_points: number;
  grid_resolution_deg: number;
  bounding_box: {
    south: number;
    north: number;
    west: number;
    east: number;
  };
  points: ConfidenceMapPoint[];
}

export interface ForecastPoint {
  latitude: number;
  longitude: number;
  forecast_precipitation_mm: number;
  verification_precipitation_mm?: number | null;
  absolute_error_mm?: number | null;
  is_bust_actual?: boolean | null;
}

export interface ForecastMapResponse {
  lead_time_hours: number;
  total_points: number;
  initialization_time: string;
  valid_time: string;
  points: ForecastPoint[];
}

export interface ExplanationResponse {
  model_type: string;
  threshold_applied_mm: number;
  global_feature_importances: Record<string, number>;
  top_driving_factors: string[];
  leakage_prevention_status: string;
  description: string;
}

export interface HealthResponse {
  status: string;
  app_name: string;
  version: string;
  model_loaded: boolean;
  model_type: string;
}
