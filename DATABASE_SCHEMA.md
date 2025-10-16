# Database Schema Documentation

## Overview

This document describes the database schema for the Mineers Smile Center Inventory Management System using Supabase (PostgreSQL).

## Tables

### 1. **categories**

Stores product categories for organizing inventory items.

| Column      | Type         | Constraints | Description                      |
| ----------- | ------------ | ----------- | -------------------------------- |
| id          | UUID         | PRIMARY KEY | Auto-generated unique identifier |
| name        | VARCHAR(255) | NOT NULL    | Category name                    |
| description | TEXT         |             | Category description             |
| created_at  | TIMESTAMP    | DEFAULT NOW | Record creation time             |
| updated_at  | TIMESTAMP    | DEFAULT NOW | Last update time                 |

### 2. **brands**

Stores brand information for inventory items.

| Column     | Type         | Constraints      | Description                      |
| ---------- | ------------ | ---------------- | -------------------------------- |
| id         | UUID         | PRIMARY KEY      | Auto-generated unique identifier |
| name       | VARCHAR(255) | NOT NULL, UNIQUE | Brand name                       |
| created_at | TIMESTAMP    | DEFAULT NOW      | Record creation time             |
| updated_at | TIMESTAMP    | DEFAULT NOW      | Last update time                 |

### 3. **suppliers**

Stores supplier contact and information.

| Column         | Type         | Constraints | Description                      |
| -------------- | ------------ | ----------- | -------------------------------- |
| id             | UUID         | PRIMARY KEY | Auto-generated unique identifier |
| name           | VARCHAR(255) | NOT NULL    | Supplier company name            |
| contact_person | VARCHAR(255) |             | Primary contact name             |
| email          | VARCHAR(255) |             | Contact email                    |
| phone          | VARCHAR(50)  |             | Contact phone number             |
| address        | TEXT         |             | Physical address                 |
| created_at     | TIMESTAMP    | DEFAULT NOW | Record creation time             |
| updated_at     | TIMESTAMP    | DEFAULT NOW | Last update time                 |

### 4. **storage_locations**

Defines physical storage locations within the facility.

| Column      | Type         | Constraints | Description                      |
| ----------- | ------------ | ----------- | -------------------------------- |
| id          | UUID         | PRIMARY KEY | Auto-generated unique identifier |
| name        | VARCHAR(255) | NOT NULL    | Location name/identifier         |
| description | TEXT         |             | Location description             |
| created_at  | TIMESTAMP    | DEFAULT NOW | Record creation time             |
| updated_at  | TIMESTAMP    | DEFAULT NOW | Last update time                 |

### 5. **items** (Main Inventory Table)

Core table storing all inventory items and their details.

| Column              | Type         | Constraints            | Description                                   |
| ------------------- | ------------ | ---------------------- | --------------------------------------------- |
| id                  | UUID         | PRIMARY KEY            | Auto-generated unique identifier              |
| item_name           | VARCHAR(255) | NOT NULL               | Item name                                     |
| category_id         | UUID         | FK → categories        | Category reference                            |
| brand_id            | UUID         | FK → brands            | Brand reference                               |
| type_description    | TEXT         |                        | Item type/description                         |
| quantity_in_stock   | INTEGER      | NOT NULL, DEFAULT 0    | Current stock quantity                        |
| unit                | VARCHAR(50)  | NOT NULL               | Unit of measurement (pieces, boxes, ml, etc.) |
| minimum_stock_level | INTEGER      | NOT NULL, DEFAULT 0    | Reorder threshold                             |
| reorder_quantity    | INTEGER      | NOT NULL, DEFAULT 0    | Suggested reorder amount                      |
| supplier_id         | UUID         | FK → suppliers         | Supplier reference                            |
| storage_location_id | UUID         | FK → storage_locations | Storage location reference                    |
| purchase_date       | DATE         |                        | Date of purchase                              |
| expiry_date         | DATE         |                        | Expiration date (if applicable)               |
| notes               | TEXT         |                        | Additional notes                              |
| created_at          | TIMESTAMP    | DEFAULT NOW            | Record creation time                          |
| updated_at          | TIMESTAMP    | DEFAULT NOW            | Last update time                              |

### 6. **users**

Extends Supabase Auth users with custom fields.

| Column     | Type         | Constraints                  | Description                    |
| ---------- | ------------ | ---------------------------- | ------------------------------ |
| id         | UUID         | PRIMARY KEY, FK → auth.users | References Supabase auth user  |
| name       | VARCHAR(255) | NOT NULL                     | User display name              |
| role       | VARCHAR(50)  | NOT NULL, CHECK              | User role (admin/staff/viewer) |
| created_at | TIMESTAMP    | DEFAULT NOW                  | Record creation time           |
| updated_at | TIMESTAMP    | DEFAULT NOW                  | Last update time               |

### 7. **stock_transactions**

Tracks all inventory movements (audit trail).

| Column           | Type        | Constraints     | Description                          |
| ---------------- | ----------- | --------------- | ------------------------------------ |
| id               | UUID        | PRIMARY KEY     | Auto-generated unique identifier     |
| item_id          | UUID        | FK → items      | Item reference                       |
| transaction_type | VARCHAR(20) | NOT NULL, CHECK | Transaction type (IN/OUT/ADJUSTMENT) |
| quantity         | INTEGER     | NOT NULL        | Quantity changed                     |
| transaction_date | TIMESTAMP   | DEFAULT NOW     | Transaction timestamp                |
| user_id          | UUID        | FK → users      | User who made the transaction        |
| notes            | TEXT        |                 | Transaction notes                    |
| created_at       | TIMESTAMP   | DEFAULT NOW     | Record creation time                 |

## Views

### **low_stock_items**

Convenient view showing items at or below minimum stock level.

Returns: item details, current stock, minimum stock level, supplier info, and storage location for items needing reorder.

## Indexes

- `idx_items_category` - Fast category filtering
- `idx_items_brand` - Fast brand filtering
- `idx_items_supplier` - Fast supplier lookup
- `idx_items_storage_location` - Fast location lookup
- `idx_items_low_stock` - Optimized low stock queries
- `idx_stock_transactions_item` - Fast transaction history
- `idx_stock_transactions_date` - Date-based transaction queries

## Row Level Security (RLS)

All tables have RLS enabled with the following general policies:

- **Viewers**: Read-only access to all tables
- **Staff**: Read + Create/Update for items, suppliers, and transactions
- **Admin**: Full access to all tables

## Setup Instructions

1. Create a Supabase project at https://supabase.com
2. Run the migration files in order:
   - `001_initial_schema.sql` - Creates all tables, indexes, and triggers
   - `002_row_level_security.sql` - Sets up security policies
   - `003_sample_data.sql` - (Optional) Adds sample data for testing
3. Configure environment variables in your Next.js project
