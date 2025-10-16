"use client";

import { useState, useEffect } from "react";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
  onUpdate?: (id: string, item: any) => void;
  initialData?: any | null;
  categories: any[];
  brands: any[];
  suppliers: any[];
  storageLocations: any[];
  isLoading?: boolean;
}

const inputClassName =
  "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900 placeholder-gray-400";

export default function AddItemModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  initialData,
  categories,
  brands,
  suppliers,
  storageLocations,
  isLoading = false,
}: AddItemModalProps) {
  const [formData, setFormData] = useState({
    item_name: "",
    category_id: "",
    brand_id: "",
    type_description: "",
    quantity_in_stock: 0,
    unit: "",
    minimum_stock_level: 0,
    reorder_quantity: 0,
    supplier_id: "",
    storage_location_id: "",
    purchase_date: "",
    expiry_date: "",
    notes: "",
  });

  // populate form when editing
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        item_name: initialData.item_name || "",
        category_id: initialData.category_id || initialData.category?.id || "",
        brand_id: initialData.brand_id || initialData.brand?.id || "",
        type_description: initialData.type_description || "",
        quantity_in_stock: initialData.quantity_in_stock ?? 0,
        unit: initialData.unit || "",
        minimum_stock_level: initialData.minimum_stock_level ?? 0,
        reorder_quantity: initialData.reorder_quantity ?? 0,
        supplier_id: initialData.supplier_id || initialData.supplier?.id || "",
        storage_location_id:
          initialData.storage_location_id ||
          initialData.storage_location?.id ||
          "",
        purchase_date: initialData.purchase_date || "",
        expiry_date: initialData.expiry_date || "",
        notes: initialData.notes || "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert empty strings to null for UUID fields
    const submissionData = {
      ...formData,
      category_id: formData.category_id || null,
      brand_id: formData.brand_id || null,
      supplier_id: formData.supplier_id || null,
      storage_location_id: formData.storage_location_id || null,
    };

  // Convert empty date strings to null so backend receives NULL
  const submission: any = submissionData;
  if (!submission.purchase_date) submission.purchase_date = null;
  if (!submission.expiry_date) submission.expiry_date = null;

    if (initialData && initialData.id && typeof onUpdate === "function") {
      onUpdate(initialData.id, submission);
    } else {
      onAdd(submission);
    }
    setFormData({
      item_name: "",
      category_id: "",
      brand_id: "",
      type_description: "",
      quantity_in_stock: 0,
      unit: "",
      minimum_stock_level: 0,
      reorder_quantity: 0,
      supplier_id: "",
      storage_location_id: "",
      purchase_date: "",
      expiry_date: "",
      notes: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Item" : "Add New Item"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Item Name *
              </label>
              <input
                type="text"
                required
                className={inputClassName}
                value={formData.item_name}
                onChange={(e) =>
                  setFormData({ ...formData, item_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Category
              </label>
              <select
                className={inputClassName}
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Brand
              </label>
              <select
                className={inputClassName}
                value={formData.brand_id}
                onChange={(e) =>
                  setFormData({ ...formData, brand_id: e.target.value })
                }
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Type/Description
              </label>
              <input
                type="text"
                className={inputClassName}
                value={formData.type_description}
                onChange={(e) =>
                  setFormData({ ...formData, type_description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Quantity *
              </label>
              <input
                type="number"
                required
                className={inputClassName}
                value={formData.quantity_in_stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity_in_stock: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Unit *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., pieces, boxes, ml"
                className={inputClassName}
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Minimum Stock Level
              </label>
              <input
                type="number"
                className={inputClassName}
                value={formData.minimum_stock_level}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minimum_stock_level: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Reorder Quantity
              </label>
              <input
                type="number"
                className={inputClassName}
                value={formData.reorder_quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reorder_quantity: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Supplier
              </label>
              <select
                className={inputClassName}
                value={formData.supplier_id}
                onChange={(e) =>
                  setFormData({ ...formData, supplier_id: e.target.value })
                }
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Storage Location
              </label>
              <select
                className={inputClassName}
                value={formData.storage_location_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    storage_location_id: e.target.value,
                  })
                }
              >
                <option value="">Select Location</option>
                {storageLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Purchase Date
              </label>
              <input
                type="date"
                className={inputClassName}
                value={formData.purchase_date}
                onChange={(e) =>
                  setFormData({ ...formData, purchase_date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                className={inputClassName}
                value={formData.expiry_date}
                onChange={(e) =>
                  setFormData({ ...formData, expiry_date: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Notes
            </label>
            <textarea
              className={inputClassName}
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? (initialData ? "Saving..." : "Adding...") : initialData ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
