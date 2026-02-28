import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// 🔥 Mock 7 Day Price Data
const priceData = [
  { day: "Mon", price: 42000 },
  { day: "Tue", price: 43000 },
  { day: "Wed", price: 41500 },
  { day: "Thu", price: 44000 },
  { day: "Fri", price: 47000 },
  { day: "Sat", price: 46000 },
  { day: "Sun", price: 48000 },
];

const CoinDetail = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      
      {/* 🔹 Coin Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
          alt="Bitcoin"
          className="w-12 h-12"
        />
        <div>
          <h1 className="text-3xl font-bold">Bitcoin (BTC)</h1>
          <p className="text-gray-400">Rank #1</p>
        </div>
      </div>

      {/* 🔹 Price Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold">$48,000</h2>
        <p className="text-green-400 text-lg">+3.5% (24h)</p>
      </div>

      {/* 🔹 Chart Section */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">7 Day Price Chart</h3>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                strokeWidth={3}
                
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Extra Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">Market Cap</p>
          <p className="text-lg font-semibold">$900B</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">24h Volume</p>
          <p className="text-lg font-semibold">$32B</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">Circulating Supply</p>
          <p className="text-lg font-semibold">19M BTC</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">All Time High</p>
          <p className="text-lg font-semibold">$69,000</p>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;