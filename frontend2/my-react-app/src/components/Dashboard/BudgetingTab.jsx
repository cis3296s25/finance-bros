// BudgetingTab.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#4ade80", "#facc15", "#f87171"];

export default function BudgetingTab() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5555/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!newCategory || !budgetAmount) return;
    const newCat = {
      name: newCategory,
      budget: parseFloat(budgetAmount),
      spent: 0,
    };
    try {
      const response = await axios.post("http://localhost:5555/categories", newCat);
      setCategories([...categories, response.data]);
      setNewCategory("");
      setBudgetAmount("");
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const totalBudget = categories.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);

  return (
    <div className="p-6 space-y-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-900">Budget Overview</h1>

      <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-700 space-y-1">
          <p className="text-lg font-medium">Total Budget: ${totalBudget}</p>
          <p className="text-lg font-medium">Total Spent: ${totalSpent}</p>
          <p className="text-lg font-semibold text-green-600">
            Remaining: ${totalBudget - totalSpent}
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <PieChart width={200} height={200}>
            <Pie
              data={categories}
              dataKey="spent"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {categories.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">Add New Category</h2>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border border-gray-300 text-gray-900 rounded px-3 py-2 w-full sm:w-auto"
          />
          <input
            type="number"
            placeholder="Budget amount"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            className="border border-gray-300 text-gray-900 rounded px-3 py-2 w-full sm:w-auto"
          />
          <button
            onClick={addCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

     <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Categories</h2>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories yet. Add one above!</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-gray-50 border border-gray-300 rounded p-4 flex justify-between items-center"
            >
              <span className="font-medium text-lg text-gray-700">{cat.name}</span>
              <span className="text-sm text-gray-600">
                ${cat.spent} / ${cat.budget}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
