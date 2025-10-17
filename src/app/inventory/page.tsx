"use client";

import { useEffect, useState } from "react";
import InventoryTable from "@/components/inventory/InventoryTable";
import AddItemModal from "@/components/inventory/AddItemModal";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [storageLocations, setStorageLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [initialStock, setInitialStock] = useState<
    "all" | "in" | "low" | undefined
  >(undefined);

  useEffect(() => {
    // read stock param from URL on the client to avoid useSearchParams SSR bailout
    try {
      const params = new URLSearchParams(window.location.search);
      const rawStock = params.get("stock") || undefined;
      const normalized =
        rawStock === "low" || rawStock === "in"
          ? (rawStock as "low" | "in")
          : rawStock === "all"
          ? "all"
          : undefined;
      setInitialStock(normalized);
    } catch {
      setInitialStock(undefined);
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [itemsRes, catsRes, brandsRes, suppliersRes, locsRes] =
        await Promise.all([
          fetch("/api/items"),
          fetch("/api/categories"),
          fetch("/api/brands"),
          fetch("/api/suppliers"),
          fetch("/api/storage-locations"),
        ]);

      const [itemsData, catsData, brandsData, suppliersData, locsData] =
        await Promise.all([
          itemsRes.json(),
          catsRes.json(),
          brandsRes.json(),
          suppliersRes.json(),
          locsRes.json(),
        ]);

      setItems(itemsData);
      setCategories(catsData);
      setBrands(brandsData);
      setSuppliers(suppliersData);
      setStorageLocations(locsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (itemData: any) => {
    try {
      setActionLoading(true);
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        fetchData();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = async (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdate = async (id: string, itemData: any) => {
    try {
      setActionLoading(true);
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        fetchData();
        setIsModalOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      setActionLoading(true);
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Add New Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No items in inventory. Click &quot;Add New Item&quot; to get
            started.
          </div>
        ) : (
          <InventoryTable
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={actionLoading}
            categories={categories}
            storageLocations={storageLocations}
            initialStockFilter={initialStock}
          />
        )}
      </div>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onAdd={handleAddItem}
        onUpdate={handleUpdate}
        initialData={editingItem}
        isLoading={actionLoading}
        categories={categories}
        brands={brands}
        suppliers={suppliers}
        storageLocations={storageLocations}
      />
    </div>
  );
}
