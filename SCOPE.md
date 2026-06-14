# Scope and Anomaly Log

## Database Entities

* User
* Group
* GroupMember
* Expense
* ExpenseParticipant
* Settlement
* ImportJob
* ImportAnomaly

## Detected Anomalies

### Missing Payer

Example:
House cleaning supplies

Policy:
Flag for manual review.

Action:
FLAGGED_FOR_REVIEW

---

### Settlement Recorded as Expense

Example:
Rohan paid Aisha back

Policy:
Treat as settlement instead of expense.

Action:
CONVERT_TO_SETTLEMENT

---

### Negative Amount

Example:
Parasailing refund

Policy:
Treat as refund transaction.

Action:
TREAT_AS_REFUND

---

### Missing Currency

Example:
Groceries DMart

Policy:
Default to INR and log anomaly.

Action:
DEFAULT_TO_INR

---

### Duplicate Expense

Example:
Dinner at Marina Bites

Policy:
Flag for user review before deletion.

Action:
FLAGGED_FOR_REVIEW

---

### Zero Amount Expense

Example:
Dinner order Swiggy

Policy:
Flag for manual review.

Action:
FLAGGED_FOR_REVIEW

## Membership Handling

Members can join and leave groups.

Expenses only apply to users who are active members on the expense date.

Example:

Meera left: 2026-03-31

Sam joined: 2026-04-15

Expenses before 2026-04-15 do not affect Sam.
