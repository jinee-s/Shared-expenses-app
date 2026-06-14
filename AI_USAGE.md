# AI_USAGE.md

## AI Tools Used

* ChatGPT

## Purpose of AI Usage

AI was used as a development assistant during the project for:

* Architecture discussions
* Database schema design review
* Next.js and Prisma debugging
* API route implementation guidance
* Import workflow design
* Documentation review

All implementation decisions, testing, debugging, and integration were performed manually.

---

## Key Prompts Used

### Prompt 1

Design a database schema for a shared expenses management application that supports:

* Users
* Groups
* Membership history
* Expenses
* Settlements
* CSV imports
* Anomaly tracking

### Prompt 2

Review the CSV dataset and identify possible anomaly categories such as:

* Duplicate expenses
* Missing payer
* Missing currency
* Refund transactions
* Settlement rows

### Prompt 3

Suggest a folder structure for a Next.js application using Prisma and PostgreSQL.

### Prompt 4

Help debug Prisma schema validation and migration issues.

### Prompt 5

Review architectural risks for a shared expenses application involving membership changes over time and multi-currency transactions.

---

## Examples of Incorrect AI Suggestions

### Case 1: Route Structure Conflict

Problem:
An AI-generated suggestion created a page route and API route using the same path, causing a Next.js routing conflict.

How it was detected:
The application failed to compile and reported a route conflict.

Fix:
The routes were reorganized and API endpoints were separated from page routes.

---

### Case 2: Prisma Relation Definition

Problem:
An AI-generated schema suggestion resulted in Prisma validation errors because relations were not correctly defined.

How it was detected:
Prisma migration generation failed.

Fix:
Relations were manually reviewed and corrected before rerunning migrations.

---

### Case 3: Import Path Resolution

Problem:
Suggested import paths did not match the actual project structure.

How it was detected:
TypeScript compilation errors appeared during development.

Fix:
Project aliases and import paths were manually corrected.

---

## Human Verification Process

Every AI-generated suggestion was reviewed before implementation.

The following verification steps were performed:

* Manual code review
* Local testing
* Database migration validation
* API testing
* End-to-end testing of import workflows

AI suggestions were treated as recommendations rather than accepted automatically.

---

## Responsibility Statement

AI was used as a development assistant to accelerate exploration and debugging.

All final architecture decisions, anomaly handling policies, implementation choices, testing, and project submission remain the responsibility of the developer.
