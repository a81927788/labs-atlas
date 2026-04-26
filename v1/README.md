# Global CBRN Defense Laboratory Benchmark Atlas — v1

Ready-to-upload GitHub Pages static website.

## V1 update

This version is aligned with the extended benchmark workbook model:

- Main objectives:
  - Anti / control / defense CBRN
  - Check, test, and calibrate CBRN items
  - Research and development for CBRN defense
- Extended `data/labs.json` with workbook-style fields:
  - lab type
  - selection rationale
  - weighted benchmark score
  - evidence grade
  - validation status
  - confidence note
  - anti/control/defense role
  - calibration/testing role
  - R&D role
  - validation gaps
- `data/metadata.json` for version tracking
- Updated dashboard landing page with scientific methodology
- Updated lab profile pages showing workbook-level sections

## Dataset status

Records: 139
Countries: 56
Version date: 2026-04-26

Important: this is a workbook-structured v1 dataset, not a fully source-verified public benchmark. Before executive or official publication, complete each profile's source URLs, accreditation evidence, facility evidence, and program/publication evidence.

## Deploy on GitHub Pages

1. Create a GitHub repository, for example `cbrn-lab-atlas`.
2. Upload the contents of this folder.
3. Go to **Settings > Pages**.
4. Choose **Deploy from branch**, branch **main**, folder **/root**.
5. Open `https://YOUR_USERNAME.github.io/cbrn-lab-atlas/`.

## Editing data

The main data file is:

`data/labs.json`

For each lab, update:
- `website`
- `evidence`
- `capabilities`
- `benchmark`
- `extended_profile`
- `source_validation_level`

Then commit:

```bash
git add .
git commit -m "Update CBRN Lab Atlas v1 data"
git push
```
