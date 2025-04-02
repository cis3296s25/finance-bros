import { useState } from "react";

function HypotheticalCalculator() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!name || !amount) return;
    const newTotal = 823.4 + parseFloat(amount); // based on dummy total
    setResult(`If you buy "${name}" for $${amount}, your new total will be $${newTotal.toFixed(2)}.`);
  };

  return (
    <div>
      <input
        className="border p-2 mr-2"
        placeholder="Hypothetical Item"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        type="number"
        placeholder="Cost"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleCalculate}
      >
        Calculate
      </button>
      {result && <p className="mt-4 text-gray-700">{result}</p>}
    </div>
  );
}

export default HypotheticalCalculator;
