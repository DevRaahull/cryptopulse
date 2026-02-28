import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 20,
            page: 1,
          },
        }
      );
      setCoins(res.data);
      toast.success("Market data loaded");
    } catch (err) {
      toast.error("Failed to fetch data");
    }
  };

  const sortCoins = (type) => {
    let sorted = [...coins];

    if (type === "price_asc")
      sorted.sort((a, b) => a.current_price - b.current_price);
    if (type === "price_desc")
      sorted.sort((a, b) => b.current_price - a.current_price);
    if (type === "marketcap_asc")
      sorted.sort((a, b) => a.market_cap - b.market_cap);
    if (type === "marketcap_desc")
      sorted.sort((a, b) => b.market_cap - a.market_cap);

    setCoins(sorted);
  };

  const addToPortfolio = (coin) => {
    let portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    portfolio.push(coin);
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    toast.success(`${coin.name} added to portfolio`);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <Toaster position="top-right" />

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8 tracking-tight text-white">
        Crypto Pulse
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 mb-8 px-4 py-3 rounded-xl
        bg-slate-900 border border-slate-700
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        outline-none transition"
      />

      {/* Sorting Buttons */}
      <div className="flex gap-4 mb-10 flex-wrap">
        {[
          { label: "Price ↑", type: "price_asc" },
          { label: "Price ↓", type: "price_desc" },
          { label: "Market Cap ↑", type: "marketcap_asc" },
          { label: "Market Cap ↓", type: "marketcap_desc" },
        ].map((btn) => (
          <button
            key={btn.type}
            onClick={() => sortCoins(btn.type)}
            className="px-4 py-2 rounded-lg
            bg-slate-800 border border-slate-700
            hover:bg-slate-700
            transition text-sm"
          >
            {btn.label}
          </button>
        ))}

        <button
          onClick={() => navigate("/portfolio")}
          className="px-4 py-2 rounded-lg
          hover:bg-slate-700
          bg-slate-800 border border-slate-700
          transition text-sm text-slate-200"
        >
          View Portfolio
        </button>
      </div>

      {/* Coins Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            className="bg-slate-900 p-6 rounded-2xl
            border border-slate-800
            hover:border-slate-600
            transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <h2 className="text-lg font-semibold text-white">
                {coin.name}
              </h2>
            </div>

            <p className="text-xl font-semibold text-white">
              ${coin.current_price}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Market Cap: ${coin.market_cap}
            </p>

            <button
              onClick={() => addToPortfolio(coin)}
              className="mt-5 w-full py-2 rounded-lg
              bg-slate-800 hover:bg-slate-700
              border border-slate-700
              transition text-sm"
            >
              Add to Portfolio
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}