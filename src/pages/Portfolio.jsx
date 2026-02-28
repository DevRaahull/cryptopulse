import { useEffect, useState } from "react";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [coin, setCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [marketData, setMarketData] = useState([]);

  // Load saved portfolio
  useEffect(() => {
    const saved = localStorage.getItem("portfolio");
    if (saved) {
      setPortfolio(JSON.parse(saved));
    }
  }, []);

  // Save portfolio
  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  // Fetch market prices every 30 sec
  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
)
        .then((res) => res.json())
        .then((data) => setMarketData(data))
        .catch((err) => console.error(err));
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const addCoin = () => {
    if (!coin || !quantity || !buyPrice) return;

    const selected = marketData.find((c) => c.id === coin);
    if (!selected) return;

    const newEntry = {
      id: selected.id,
      name: selected.name,
      symbol: selected.symbol,
      quantity: Number(quantity),
      buyPrice: Number(buyPrice),
    };

    setPortfolio([...portfolio, newEntry]);
    setCoin("");
    setQuantity("");
    setBuyPrice("");
  };

  const removeCoin = (index) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  // Live calculation using marketData
  const portfolioWithLivePrice = portfolio.map((item) => {
    const marketCoin = marketData.find((c) => c.id === item.id);
    return {
      ...item,
      current_price: marketCoin?.current_price || 0,
    };
  });

  const totalInvested = portfolioWithLivePrice.reduce(
    (acc, item) => acc + item.buyPrice * item.quantity,
    0
  );

  const totalCurrent = portfolioWithLivePrice.reduce(
    (acc, item) => acc + item.current_price * item.quantity,
    0
  );

  const totalProfit = totalCurrent - totalInvested;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Portfolio Tracker
      </h1>

      {/* Add Coin */}
      <div className="bg-[#1e293b] p-6 rounded-xl mb-6">
        <div className="grid sm:grid-cols-4 gap-4">
          <select
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            className="p-2 bg-gray-800 rounded"
          >
            <option value="">Select Coin</option>
            {marketData.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 bg-gray-800 rounded"
          />

          <input
            type="number"
            placeholder="Buy Price"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="p-2 bg-gray-800 rounded"
          />

          <button
            onClick={addCoin}
            className="bg-green-500 rounded p-2"
          >
            Add
          </button>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="bg-[#1e293b] p-6 rounded-xl">
        {portfolioWithLivePrice.length === 0 && (
          <p className="text-gray-400">No coins added yet.</p>
        )}

        {portfolioWithLivePrice.map((item, index) => {
          const invested = item.buyPrice * item.quantity;
          const current = item.current_price * item.quantity;
          const profit = current - invested;
          const percent =
            invested > 0
              ? ((profit / invested) * 100).toFixed(2)
              : 0;

          return (
            <div
              key={index}
              className="flex justify-between border-b border-gray-700 py-3"
            >
              <div>
                <p className="font-semibold">
                  {item.name} ({item.symbol})
                </p>
                <p className="text-sm text-gray-400">
                  Qty: {item.quantity}
                </p>

                <button
                  onClick={() => removeCoin(index)}
                  className="text-red-400 text-sm mt-2"
                >
                  Remove
                </button>
              </div>

              <div className="text-right">
                <p>Invested: ${invested.toFixed(2)}</p>
                <p>Current: ${current.toFixed(2)}</p>
                <p
                  className={
                    profit >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {profit >= 0 ? "+" : ""}
                  {profit.toFixed(2)} ({percent}%)
                </p>
              </div>
            </div>
          );
        })}

        {portfolioWithLivePrice.length > 0 && (
          <div className="mt-6 border-t border-gray-600 pt-4 text-right">
            <p>Total Invested: ${totalInvested.toFixed(2)}</p>
            <p>Total Current: ${totalCurrent.toFixed(2)}</p>
            <p
              className={
                totalProfit >= 0
                  ? "text-green-400 font-bold"
                  : "text-red-400 font-bold"
              }
            >
              Total P/L: {totalProfit.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Portfolio;