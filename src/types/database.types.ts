export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface StorageLocation {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: string;
  item_name: string;
  category_id: string | null;
  brand_id: string | null;
  type_description: string | null;
  quantity_in_stock: number;
  unit: string;
  minimum_stock_level: number;
  reorder_quantity: number;
  supplier_id: string | null;
  storage_location_id: string | null;
  purchase_date: string | null;
  expiry_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  role: "admin" | "staff" | "viewer";
  created_at: string;
  updated_at: string;
}

export interface StockTransaction {
  id: string;
  item_id: string | null;
  transaction_type: "IN" | "OUT" | "ADJUSTMENT";
  quantity: number;
  transaction_date: string;
  user_id: string | null;
  notes: string | null;
  created_at: string;
}

export interface LowStockItem {
  id: string;
  item_name: string;
  category_name: string | null;
  brand_name: string | null;
  quantity_in_stock: number;
  minimum_stock_level: number;
  reorder_quantity: number;
  supplier_name: string | null;
  storage_location: string | null;
  expiry_date: string | null;
}
