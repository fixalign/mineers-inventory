-- Sample data for testing (optional - you can remove this file if not needed)

-- Insert sample categories
INSERT INTO in_categories (name, description) VALUES
    ('Dental Supplies', 'General dental supplies and materials'),
    ('Medical Equipment', 'Medical equipment and tools'),
    ('Cleaning Supplies', 'Cleaning and sanitation products'),
    ('Office Supplies', 'Administrative and office materials');

-- Insert sample brands
INSERT INTO in_brands (name) VALUES
    ('3M'),
    ('Dentsply Sirona'),
    ('Ivoclar Vivadent'),
    ('Kerr'),
    ('Generic');

-- Insert sample suppliers
INSERT INTO in_suppliers (name, contact_person, email, phone, address) VALUES
    ('Dental Supply Co.', 'John Smith', 'john@dentalsupply.com', '+1-555-0100', '123 Main St, City, State 12345'),
    ('Medical Equipment Inc.', 'Jane Doe', 'jane@medequip.com', '+1-555-0200', '456 Oak Ave, City, State 12345'),
    ('Clean & Safe Supplies', 'Bob Johnson', 'bob@cleansafe.com', '+1-555-0300', '789 Pine Rd, City, State 12345');

-- Insert sample storage locations
INSERT INTO in_storage_locations (name, description) VALUES
    ('Cabinet A1', 'Main storage cabinet - Room 1'),
    ('Cabinet B2', 'Secondary storage - Room 2'),
    ('Refrigerator', 'Temperature-controlled storage'),
    ('Supply Closet', 'General supply closet');

-- Note: Sample items will be added after you set up the application
-- This is because items require foreign key references to the above tables
