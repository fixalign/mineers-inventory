-- Mineers Smile Center Inventory Management System
-- Initial Database Schema

-- 1. Categories Table
CREATE TABLE in_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Brands Table
CREATE TABLE in_brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Suppliers Table
CREATE TABLE in_suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Storage Locations Table
CREATE TABLE in_storage_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Items Table (Main Inventory)
CREATE TABLE in_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_name VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES in_categories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES in_brands(id) ON DELETE SET NULL,
    type_description TEXT,
    quantity_in_stock INTEGER NOT NULL DEFAULT 0,
    unit VARCHAR(50) NOT NULL,
    minimum_stock_level INTEGER NOT NULL DEFAULT 0,
    reorder_quantity INTEGER NOT NULL DEFAULT 0,
    supplier_id UUID REFERENCES in_suppliers(id) ON DELETE SET NULL,
    storage_location_id UUID REFERENCES in_storage_locations(id) ON DELETE SET NULL,
    purchase_date DATE,
    expiry_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Users Table (using Supabase Auth but extending with custom fields)
CREATE TABLE in_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff', 'viewer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Stock Transactions Table (for tracking inventory movements)
CREATE TABLE in_stock_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES in_items(id) ON DELETE CASCADE,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('IN', 'OUT', 'ADJUSTMENT')),
    quantity INTEGER NOT NULL,
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES in_users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_items_category ON in_items(category_id);
CREATE INDEX idx_items_brand ON in_items(brand_id);
CREATE INDEX idx_items_supplier ON in_items(supplier_id);
CREATE INDEX idx_items_storage_location ON in_items(storage_location_id);
CREATE INDEX idx_items_low_stock ON in_items(quantity_in_stock, minimum_stock_level);
CREATE INDEX idx_stock_transactions_item ON in_stock_transactions(item_id);
CREATE INDEX idx_stock_transactions_date ON in_stock_transactions(transaction_date);

-- Create a view for low stock items
CREATE VIEW in_low_stock_items AS
SELECT 
    i.id,
    i.item_name,
    c.name AS category_name,
    b.name AS brand_name,
    i.quantity_in_stock,
    i.minimum_stock_level,
    i.reorder_quantity,
    s.name AS supplier_name,
    sl.name AS storage_location,
    i.expiry_date
FROM in_items i
LEFT JOIN in_categories c ON i.category_id = c.id
LEFT JOIN in_brands b ON i.brand_id = b.id
LEFT JOIN in_suppliers s ON i.supplier_id = s.id
LEFT JOIN in_storage_locations sl ON i.storage_location_id = sl.id
WHERE i.quantity_in_stock <= i.minimum_stock_level;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON in_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON in_brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON in_suppliers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_storage_locations_updated_at BEFORE UPDATE ON in_storage_locations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON in_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON in_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
