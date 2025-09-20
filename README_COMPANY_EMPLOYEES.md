# Company Employees Migration Guide

## Overview

This document explains the changes made to separate company employees from general users by storing them in a dedicated "CompanyEmployees" collection instead of using the "users" collection with a role filter.

## Changes Made

### 1. Database Structure

- Created a new "CompanyEmployees" collection in MongoDB
- Company employees are now stored in this dedicated collection
- General users (clients, vendors, admins) remain in the "users" collection

### 2. API Routes Updated

- `/api/employeeManagement` - Now uses "CompanyEmployees" collection
- `/api/employeeStats` - Now uses "CompanyEmployees" collection
- `/api/admin/reports/employees` - Now uses "CompanyEmployees" collection
- `/api/admin/attendance` - Now uses "CompanyEmployees" collection
- `/api/employeeProfile` - Now uses "CompanyEmployees" collection with backward compatibility
- `/api/userManagement` - Updated to handle company employees with new `isCompanyEmployee` parameter
- `/api/user` - Updated to handle company employees

### 3. Migration Script

A migration script has been created to move existing company employees from the "users" collection to the new "CompanyEmployees" collection.

## Migration Process

### 1. Run the Migration Script

```bash
npm run migrate:employees
```

This script will:

- Find all users with `userType: "Employee"` in the "users" collection
- Transform their data to match the new structure
- Insert them into the "CompanyEmployees" collection

### 2. Verify the Migration

After running the migration, you can verify that:

- All company employees have been moved to the "CompanyEmployees" collection
- The employee management dashboard still works correctly
- All employee-related functionality continues to work as expected

## New Data Structure

### CompanyEmployees Collection

The new "CompanyEmployees" collection includes additional fields:

- `userId` - Reference to the original user ID in the "users" collection
- `department` - Employee's department
- `position` - Employee's position
- `status` - Employee's status (Active, On Leave, Inactive)
- `joinDate` - Employee's join date
- `salary` - Employee's salary
- `manager` - Employee's manager

## Benefits

1. **Separation of Concerns** - Company employees are now separate from general users
2. **Better Performance** - Queries for company employees are more efficient
3. **Scalability** - Easier to manage and scale employee-related data
4. **Data Integrity** - Dedicated collection with appropriate schema for company employees

## Backward Compatibility

The changes maintain backward compatibility:

- Existing API routes continue to work
- Frontend components require no changes
- The employee profile API includes fallback to the "users" collection
