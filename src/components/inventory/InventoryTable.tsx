"use client";

import { useState } from "react";

interface InventoryTableProps {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  categories?: any[];
  storageLocations?: any[];
  initialStockFilter?: "all" | "in" | "low";
}

export default function InventoryTable({
  items,
  onEdit,
  onDelete,
  isLoading = false,
  categories = [],
  storageLocations = [],
  initialStockFilter,
}: InventoryTableProps) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "low">(
    (initialStockFilter as any) || "all"
  );

  const filteredItems = items.filter((item) => {
    // search by name, description, notes
    const q = query.trim().toLowerCase();
    if (q) {
      const hay =
        `${item.item_name} ${item.type_description} ${item.notes}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    if (categoryFilter) {
      const catId = item.category_id || item.category?.id || "";
      if (catId !== categoryFilter) return false;
    }

    if (locationFilter) {
      const locId = item.storage_location_id || item.storage_location?.id || "";
      if (locId !== locationFilter) return false;
    }

    if (stockFilter && stockFilter !== "all") {
      const qty = Number(item.quantity_in_stock ?? 0);
      const min = Number(item.minimum_stock_level ?? 0);
      if (stockFilter === "low") {
        if (!(qty <= min)) return false;
      } else if (stockFilter === "in") {
        if (!(qty > min)) return false;
      }
    }

    return true;
  });
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-3 mb-4">
        <input
          type="search"
          placeholder="Search items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-3 py-2 w-80"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Locations</option>
          {storageLocations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as any)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Stock</option>
          <option value="in">In Stock</option>
          <option value="low">Low Stock</option>
        </select>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Storage Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min. Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.item_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.category?.name || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.storage_location?.name ||
                  item.storage_location_id ||
                  "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.quantity_in_stock} {item.unit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.minimum_stock_level}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.quantity_in_stock <= item.minimum_stock_level ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Low Stock
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    In Stock
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(item)}
                  disabled={isLoading}
                  className="text-teal-600 hover:text-teal-900 font-medium mr-4 transition-colors disabled:opacity-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  disabled={isLoading}
                  className="text-red-600 hover:text-red-900 font-medium transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
