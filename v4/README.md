# CBRN Laboratory Intelligence Atlas v4

Internal, light-mode, evidence-based benchmarking platform for global CBRN laboratory capability assessment.

## What is new in v4

- Light professional UI, not dark mode
- Evidence → interpretation → score → confidence → gap structure
- Fixed weighted model:
  - Strategic Relevance 22%
  - Technical Capability 20%
  - Operational Support 16%
  - Accreditation Standards 12%
  - Research Output 12%
  - Infrastructure Maturity 10%
  - International Collaboration 8%
- Auto-calculated scoring logic in the UI
- Evidence strength per criterion
- Validation tiers and confidence display
- Analytical map using Leaflet + OpenStreetMap
- Paginated lab explorer, 10 cards per page
- Expert lab profile pages
- Evidence table per lab
- Data integrity panel per lab
- Side-by-side comparison mode with radar chart
- Gap analysis and data maturity metrics

## How to run

Unzip the package, open a terminal in the project folder, then run:

```bash
python -m http.server 9090
```

Open:

```text
http://localhost:9090
```

If port 9090 is busy, use another port:

```bash
python -m http.server 8081
```

## Important notes

This is an internal analytical platform. The included dataset is workbook-derived and structured for v4. It is not a final authoritative database. Before formal reliance, validate at least 40 anchor labs to Tier 1 standard using official, publication, standards, accreditation, and collaboration sources.

The map and radar chart use external open-source/CDN libraries:

- Leaflet and OpenStreetMap for the real map
- Chart.js for radar comparison

If the system is used in an offline network, host these libraries internally and update the script/style links.

## Data source of truth

Edit:

```text
data/labs.json
```

The preferred workflow is:

```text
Benchmark Workbook → Validation & Cleaning → labs.json → Atlas UI
```

Do not edit scoring only in the UI. Keep the dataset as the source of truth.
