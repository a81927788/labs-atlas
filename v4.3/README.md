# CBRN Laboratory Intelligence Atlas — v4.2 Consistency Fix

This release preserves the full lab list across versions and prevents silent record loss.

## What changed in v4.2

- Preserved the prior complete master lab list and migrated it forward into the v4 schema.
- Added stable `stable_id`, `dataset_lineage`, `consistency_status`, and `country_normalized` fields.
- Added `data-audit.html` to verify lab counts, country counts, duplicate IDs, missing coordinates, candidate records, and evidence gaps.
- Added `data/dataset_changelog.json` to document added, removed, and restored records.
- Improved country matching with aliases such as Pakistan/Pakstan, USA/United States, UK/United Kingdom, and KSA/Saudi Arabia.
- Country pages no longer silently substitute unrelated labs if a country has no match.
- Candidate/Tier 3 labs remain visible by default.

## Run locally

```bash
python -m http.server 9090
```

Open:

```text
http://localhost:9090
```

## Consistency rule

The dataset must be migrated forward version-by-version. Do not regenerate the lab list from scratch.

## Dataset counts

- Previous master count: 139
- Current v4.2 count: 139
- Restored from prior master: 0
- Removed since prior master: 0

## Verify Pakistan records

Open `data-audit.html` and search for Pakistan, or open:

```text
country.html?country=Pakistan
```


## v4.3 UX audit implementation

This release keeps the v4.2 consistency-fixed dataset intact and improves the presentation layer for laptop-based expert review. Key changes: redesigned lab cards, laptop-first responsive grids, improved profile scorecard readability, safer long-text wrapping, clearer navigation, and a new Design Audit page. No lab records were regenerated or removed.
