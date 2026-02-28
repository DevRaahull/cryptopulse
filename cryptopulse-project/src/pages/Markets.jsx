import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Markets() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
     const res = await fetch(
  "/api/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
);
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.error("Markets error:", err);
      setLoading(false);
    }
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 text-white text-xl">
        Loading market data...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Crypto Markets</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search coin..."
        className="mb-6 p-2 rounded bg-[#1e293b] w-full max-w-md outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="py-3">#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h</th>
              <th>Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {filteredCoins.map((coin, index) => (
              <tr
                key={coin.id}
                className="border-b border-gray-800 hover:bg-[#1e293b] transition"
              >
                <td className="py-3">{index + 1}</td>

                <td>
                  <Link
                    to={`/coin/${coin.id}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-6 h-6"
                    />
                    <span>{coin.name}</span>
                    <span className="text-gray-400 uppercase text-sm">
                      {coin.symbol}
                    </span>
                  </Link>
                </td>

                <td>${coin.current_price.toLocaleString()}</td>

                <td
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>

                <td>
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}