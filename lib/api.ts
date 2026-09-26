import {
  HealthResponse,
  ConfidenceMapResponse,
  ForecastMapResponse,
  ExplanationResponse,
  PredictionRequest,
  PredictionResponse,
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown network error');
    throw new Error(`HTTP Error ${res.status}: ${errorText}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE_URL}/health`, { cache: 'no-store' });
  return handleResponse<HealthResponse>(res);
}

export async function fetchConfidenceMap(
  leadTimeHours: number = 24,
  stride: number = 4,
  modelType: 'xgboost' | 'cnn' = 'xgboost'
): Promise<ConfidenceMapResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/confidence-map?lead_time_hours=${leadTimeHours}&stride=${stride}&model_type=${modelType}`,
    { cache: 'no-store' }
  );
  return handleResponse<ConfidenceMapResponse>(res);
}

export async function fetchForecastLayer(
  leadTimeHours: number = 24,
  stride: number = 4
): Promise<ForecastMapResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/forecast?lead_time_hours=${leadTimeHours}&stride=${stride}`,
    { cache: 'no-store' }
  );
  return handleResponse<ForecastMapResponse>(res);
}

export async function fetchExplanation(): Promise<ExplanationResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/explanation`, { cache: 'no-store' });
  return handleResponse<ExplanationResponse>(res);
}

export async function predictBust(
  payload: PredictionRequest,
  modelType: 'xgboost' | 'cnn' = 'xgboost'
): Promise<PredictionResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/predict?model_type=${modelType}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<PredictionResponse>(res);
}
