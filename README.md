# Forecast Bust AI — Next.js Dashboard Frontend (`forecast-bust-frontend`)

**Organization:** `forecast-bust-ai`  
**Problem Statement ID:** 26079 (NCMRWF / Ministry of Earth Sciences)

## Overview
This repository contains the Next.js, React, TypeScript, and Tailwind CSS scientific weather dashboard for the Forecast Bust AI platform.

## Key Features
- **Interactive Regional Map:** Highlighting forecast bust hotspots across India ($0^\circ\text{N}\text{--}40^\circ\text{N}, 60^\circ\text{E}\text{--}100^\circ\text{E}$).
- **Lead Time Selector:** Multi-day forecast horizon selection (24h, 48h, 72h, 96h, 120h).
- **Dual-Model Inference Support:** Real-time visual comparison of XGBoost Baseline and PyTorch Spatial CNN model outputs.
- **Detailed Explanation Panel:** Model confidence ratings, expected precipitation error (mm), and feature importances.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build
```

## Environment Variables
Copy `.env.example` to `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```
