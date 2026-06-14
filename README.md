# Shared Expenses Management System

## Overview

A Splitwise-like shared expenses application built using Next.js, TypeScript, Prisma, PostgreSQL, and Tailwind CSS.

The system supports:

* User management
* Group management
* Membership history tracking
* Expense tracking
* CSV import
* Import anomaly detection
* Balance summary

## Tech Stack

* Next.js
* TypeScript
* Prisma ORM
* PostgreSQL (Neon)
* Tailwind CSS

## Setup

1. Clone repository

```bash
git clone <repo-url>
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

```env
DATABASE_URL=your_database_url
```

4. Run migrations

```bash
npx prisma migrate dev
```

5. Start application

```bash
npm run dev
```

## Features

* Create and manage users
* Create and manage groups
* Track membership changes over time
* Record expenses
* Import expenses from CSV
* Detect data anomalies
* Generate import reports
* View balance summaries

## AI Used

* ChatGPT
* GitHub Copilot

## Demo Credentials

The application includes a simple email/password login module for demonstration purposes.

Sample users:

| Email                                   | Password |
| --------------------------------------- | -------- |
| [aisha@test.com](mailto:aisha@test.com) | temp123  |
| [rohan@test.com](mailto:rohan@test.com) | temp123  |
| [priya@test.com](mailto:priya@test.com) | temp123  |
| [meera@test.com](mailto:meera@test.com) | temp123  |
| [sam@test.com](mailto:sam@test.com)     | temp123  |
| [dev@test.com](mailto:dev@test.com)     | temp123  |

After login, users can access group management, expenses, settlements, CSV import, anomaly reports, and balance summaries.
