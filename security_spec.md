# Security Specification for Madhura Abacus Star

## 1. Data Invariants
- A student profile must belong to a registered user with `role: 'student'`.
- A parent can see their children's (`student`) data, but not other students.
- Performance metrics are read-only for students/parents, updated only by admins or system processes.
- Mentah math sessions can only be created by the user who performed the session.
- Franchise inquiries are private to admins and the creator.

## 2. The Dirty Dozen Payloads (Targeting Vulnerabilities)
1. **Self-Promotion**: User attempts to set `role: 'admin'` on registration.
2. **Identity Spoofing**: User A attempts to create a MentalMathSession with `studentId: userB_uid`.
3. **Data Poisoning**: Injecting a 1MB string into the `displayName`.
4. **Relational Leak**: Parent A attempts to read PerformanceMetrics of Student B (who is not their child).
5. **Admin Lockdown Bypass**: Attempting to delete a Course without being an admin.
6. **Shadow Update**: Updating a Course and adding an `isFree: true` field that doesn't exist in schema.
7. **Query Scrape**: Authenticated user attempts to `list` all users to get emails.
8. **PII Leak**: Reading `users/{userId}` where the user contains private info without owner status.
9. **Timestamp Spoof**: Providing a future `createdAt` from the client.
10. **ID Poisoning**: Using a 2KB string as a document ID for an inquiry.
11. **State Overwrite**: Changing a FranchiseInquiry `status` from `closed` back to `pending`.
12. **Orphaned Write**: Creating a MentalMathSession for a `studentId` that doesn't exist in `/users`.

## 3. Test Scernarios (firestore.rules.test.ts logic)
- Verify `PERMISSION_DENIED` for all "Dirty Dozen".
- Verify `ALLOW` for legitimate owner reads and writes.
