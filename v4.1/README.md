# CBRN Laboratory Intelligence Atlas v4.1

Internal light-mode analytical atlas for CBRN laboratory benchmarking.

## What changed in v4.1

- Restored country pages:
  - `countries.html` for all country groups
  - `country.html?country=Country%20Name` for individual country clusters
- Added Countries navigation to all pages.
- Added country-level statistics, domain distribution, maturity indicators, and paginated country lab cards.
- Improved laptop layout:
  - responsive card widths
  - safer text wrapping for long lab/institution names
  - larger containers for laptop screens
  - better pagination and sticky result header
  - improved profile and evidence table fitting

## Run locally

From this folder:

```bash
python -m http.server 9090
```

Then open:

```text
http://localhost:9090
```

## Main pages

- `index.html` — dashboard and map
- `countries.html` — country grouping page
- `country.html?country=United%20Kingdom` — example country page
- `labs.html` — paginated lab explorer
- `lab.html?id=dstl-porton-down` — example lab profile
- `compare.html` — comparison mode

## Data

The source dataset is:

```text
data/labs.json
```

The system expects criterion-level scoring, evidence, confidence, and gap fields for defensible benchmarking.

## Note

This is an internal analytical prototype. Candidate entries and low-confidence profiles require source validation before formal reliance.
