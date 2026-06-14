# AI_USAGE.md

## AI Tools Used

ChatGPT was used as a technical assistant during development for discussing architecture ideas, debugging issues, understanding framework behavior, and reviewing implementation approaches.

## How AI Was Used

AI assistance was primarily used for:

* Discussing database schema design
* Understanding Prisma migration issues
* Debugging Next.js routing problems
* Reviewing anomaly detection logic
* Exploring alternative implementation approaches

All final implementation decisions, testing, debugging, and integration were performed manually.

## Examples of AI Suggestions That Required Changes

### Case 1: Import Path Resolution

Suggested approach resulted in unresolved imports due to project structure differences.

Resolution:
The project structure was reorganized and imports were manually corrected.

---

### Case 2: Route Structure

An initial routing approach caused conflicts between API routes and page routes.

Resolution:
API and UI routes were separated into distinct directories after testing.

---

### Case 3: Database Schema Validation

Schema changes initially failed Prisma validation.

Resolution:
Relations and model definitions were reviewed and corrected before migration.

## Verification Process

All generated suggestions were manually reviewed before being added to the project.

Each feature was tested locally, and changes were made where suggestions did not match project requirements.

## Responsibility Statement

AI was used as a development assistant and reference tool.

The final architecture, implementation choices, anomaly handling policies, testing, and project submission remain the responsibility of the developer.
