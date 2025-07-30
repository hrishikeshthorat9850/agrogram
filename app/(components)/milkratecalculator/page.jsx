"use client";
import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";

const companies = [
  { name: "Amul", rate: 33 },
  { name: "Mother Dairy", rate: 34 },
  { name: "Gokul", rate: 32 },
  { name: "Parag", rate: 35 },
  { name: "Saras", rate: 31 },
  { name: "VRS", rate: 36 },
  { name: "Warana", rate: 33 },
  { name: "Nandini", rate: 34 },
  { name: "Aavin", rate: 32 },
  { name: "Milma", rate: 35 },
];

export default function MilkRateCalculator() {
  const [quantity, setQuantity] = useState(1);
  const [snf, setSnf] = useState(8.5);
  const [fat, setFat] = useState(4.0);
  const [company, setCompany] = useState(companies[0].name);

  const selectedCompany = companies.find(c => c.name === company);
  const rate = selectedCompany ? selectedCompany.rate : 0;
  const total = quantity * rate;

  return (
    <section className="w-full max-w-md mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-800">
        <FaCalculator className="text-green-600" />
        Milk Rate Calculator
      </h2>
      <div className="bg-white rounded-xl shadow border border-green-100 p-6 flex flex-col gap-4">
        <div>
          <label className="block text-green-900 font-medium mb-1">Select Company</label>
          <select
            className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={company}
            onChange={e => setCompany(e.target.value)}
          >
            {companies.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-green-900 font-medium mb-1">Milk Quantity (liters)</label>
          <input
            type="number"
            min={1}
            className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-green-900 font-medium mb-1">SNF (%)</label>
            <input
              type="number"
              step={0.1}
              min={0}
              className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={snf}
              onChange={e => setSnf(Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <label className="block text-green-900 font-medium mb-1">Fat (%)</label>
            <input
              type="number"
              step={0.1}
              min={0}
              className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={fat}
              onChange={e => setFat(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="mt-4 text-lg font-semibold text-green-800">
          Rate: <span className="font-mono">₹{rate} / liter</span>
        </div>
        <div className="text-xl font-bold text-green-900">
          Total: <span className="font-mono">₹{total}</span>
        </div>
      </div>
    </section>
  );
} 