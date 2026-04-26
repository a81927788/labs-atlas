# CBRN Laboratory Intelligence Atlas v3.0

Internal static dashboard for expert benchmarking of global laboratories relevant to CBRN defense, control, calibration, operational support, and R&D.

## What is new in v3

- Real open-source map layer using Leaflet + OpenStreetMap tiles.
- Lab-card pagination: 10 cards per page on the main atlas and country pages.
- Full justification for the criterion weights:
  - Strategic relevance: 22%
  - Technical capability: 20%
  - Operational support: 16%
  - Accreditation standards: 12%
  - Research output: 12%
  - Infrastructure maturity: 10%
  - International collaboration: 8%
- Every lab profile now includes a section for each criterion with:
  - criterion score
  - criterion weight
  - justification for why that criterion matters
  - profile-level supporting data from the workbook fields

## How to run locally

Open a terminal inside the project folder and run:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Map note

The v3 map uses the open-source Leaflet JavaScript library with OpenStreetMap tiles. If the internal network blocks internet access, host/mirror the tile layer internally or replace the tile URL in `assets/js/app.js`.

## Data files

Main dataset:

```text
data/labs.json
```

Metadata and scoring weights:

```text
data/metadata.json
```

## Validation note

This remains an internal analytical atlas. It is designed to be better than a PPT by acting as a living workbook UI. The dataset contains structured expert-support fields, but final formal use should validate each lab against official sources, accreditation records, technical reports, scientific publications, or government references.
