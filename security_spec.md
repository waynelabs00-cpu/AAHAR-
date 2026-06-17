# Security Spec

## Data Invariants
1. `users`: A user can only be created with their own `userId`. Only admins can modify roles. Only signed-in users can read user data.
2. `schools`: Any signed-in user can read schools. Only Admins can create/update schools.
3. `stockInventory`: Only users who are staff, principals, or admins of a school can read/write stock inventory for that school.
4. `dailyMeals`: Only users associated with the specific school can read/write daily meals.

## The "Dirty Dozen" Payloads
1. User profile creation with mismatched UID.
2. Non-admin user attempting to change their role.
3. Accessing users list as an anonymous user.
4. Writing to stock inventory with a non-matching schoolId.
5. Missing required fields in stock update.
6. Putting bad types (e.g., extremely large strings) into school name.
7. Attempting to add stock without being linked to the school.
8. Bypassing state logic in stock update.
... (Other checks omitted for brevity)
