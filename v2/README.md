# CBRN Laboratory Intelligence Atlas v2.0

Internal static dashboard for expert benchmarking of global laboratories relevant to CBRN defense, control, calibration, operational support, and R&D.

## What is new in v2

- Internal intelligence-dashboard UI
- Offline SVG geospatial view, no external map dependency
- Lab filters by country, CBRN domain, mission, validation tier, and score
- Country grouping pages
- Individual lab profile pages
- Side-by-side comparison mode
- Extended v2 data fields:
  - `score_v2`
  - `validation_tier`
  - `confidence_level`
  - `source_posture`
  - `cbrn_defense_role`
  - `evidence_requirements`
  - `relevance_to_internal_use`
  - `review_notes`

## How to run locally

Open a terminal inside the project folder and run:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

If Python is not available, any static file server works.

## Data file

The main dataset is:

```text
data/labs.json
```

Metadata and scoring weights are stored in:

```text
data/metadata.json
```

## Important validation note

This is an internal analytical starter. The dataset is structured for expert review and workbook-style benchmarking. It should not be treated as a final source-validated benchmark until each profile has been reviewed against official institutional sources, public technical documents, accreditation references, scientific literature, or government publications.

## Recommended expert workflow

1. Review top-priority anchor labs first.
2. Add official source URLs and supporting evidence.
3. Adjust benchmark criterion scores based on evidence.
4. Update validation tier and confidence level.
5. Commit changes with a clear version note.

## Scoring model

The v2 score is calculated from seven criteria:

- Strategic relevance: 22%
- Technical capability: 20%
- Operational support: 16%
- Accreditation and standards: 12%
- Research output: 12%
- Infrastructure maturity: 10%
- International collaboration: 8%

The score is a decision-support indicator, not an absolute ranking.
