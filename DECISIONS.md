# Engineering Decision Log

## Decision 1

Problem:
Members join and leave groups.

Options:

1. Store only current members
2. Track membership history

Chosen:
Track membership history using joinedAt and leftAt.

Reason:
Required for accurate expense allocation.

---

## Decision 2

Problem:
Negative expense amounts.

Options:

1. Reject row
2. Treat as refund

Chosen:
Treat as refund.

Reason:
CSV explicitly contains refund entries.

---

## Decision 3

Problem:
Settlement stored as expense.

Options:

1. Import as expense
2. Convert to settlement

Chosen:
Convert to settlement.

Reason:
Produces accurate balances.

---

## Decision 4

Problem:
Missing currency.

Options:

1. Reject import
2. Default to INR

Chosen:
Default to INR and log anomaly.

Reason:
Allows import completion while maintaining audit trail.

---

## Decision 5

Problem:
Duplicate expenses.

Options:

1. Automatically delete
2. Require review

Chosen:
Flag for review.

Reason:
Users requested approval before changes.
