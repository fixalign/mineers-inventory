"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStockItems: 0,
    categories: 0,
    suppliers: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [itemsRes, catsRes, suppliersRes, transactionsRes] =
        await Promise.all([
          fetch("/api/items"),
          fetch("/api/categories"),
          fetch("/api/suppliers"),
          fetch("/api/transactions"),
        ]);

      const [items, categories, suppliers, transactions] = await Promise.all([
        itemsRes.json(),
        catsRes.json(),
        suppliersRes.json(),
        transactionsRes.json(),
      ]);

      const lowStock = items.filter(
        (item: any) => item.quantity_in_stock <= item.minimum_stock_level
      );

      setStats({
        totalItems: items.length,
        lowStockItems: lowStock.length,
        categories: categories.length,
        suppliers: suppliers.length,
      });

      setRecentTransactions(transactions.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <Link
            href="/inventory"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            View Inventory
          </Link>
          <Link
            href="/categories"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Manage Categories
          </Link>
          <Link
            href="/suppliers"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Manage Suppliers
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          href="/inventory"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h3 className="text-gray-500 text-sm font-medium">Total Items</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.totalItems}
          </p>
        </Link>

        <Link
          href="/inventory"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h3 className="text-gray-500 text-sm font-medium">Low Stock Items</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {stats.lowStockItems}
          </p>
          {stats.lowStockItems > 0 && (
            <p className="text-xs text-red-500 mt-1">⚠️ Needs attention</p>
          )}
        </Link>

        <Link
          href="/categories"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h3 className="text-gray-500 text-sm font-medium">Categories</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.categories}
          </p>
        </Link>

        <Link
          href="/suppliers"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h3 className="text-gray-500 text-sm font-medium">Suppliers</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.suppliers}
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/inventory"
              className="p-4 border-2 border-teal-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all shadow-sm hover:shadow-md text-center"
            >
              <div className="text-2xl mb-2">📦</div>
              <div className="font-medium text-gray-900">Add Item</div>
            </Link>
            <Link
              href="/categories"
              className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md text-center"
            >
              <div className="text-2xl mb-2">🏷️</div>
              <div className="font-medium text-gray-900">Add Category</div>
            </Link>
            <Link
              href="/brands"
              className="p-4 border-2 border-cyan-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all shadow-sm hover:shadow-md text-center"
            >
              <div className="text-2xl mb-2">🏢</div>
              <div className="font-medium text-gray-900">Add Brand</div>
            </Link>
            <Link
              href="/suppliers"
              className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md text-center"
            >
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-medium text-gray-900">Add Supplier</div>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <Link
              href="/inventory"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All
            </Link>
          </div>
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500">No recent transactions</p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction: any) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {transaction.item?.item_name || "Unknown Item"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {transaction.transaction_type} - {transaction.quantity}{" "}
                      units
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">
          Welcome to Mineers Smile Center Inventory
        </h2>
        <p className="mb-4">
          Manage your dental and medical supplies efficiently
        </p>
        <div className="flex gap-3">
          <Link
            href="/storage-locations"
            className="bg-white text-teal-700 px-4 py-2 rounded hover:bg-teal-50 shadow-md transition-all"
          >
            Storage Locations
          </Link>
          <Link
            href="/brands"
            className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-50 shadow-md transition-all"
          >
            Brands
          </Link>
        </div>
      </div>
    </div>
  );
}
