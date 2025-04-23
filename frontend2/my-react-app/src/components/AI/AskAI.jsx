import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function AskAI() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const { user } = useUser();

  const [loading, setLoading] = useState(false); // new


const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5555/api/ai/chat", {
        userId: user?.id,
        message,
      });
      setResponse(res.data.reply);
    } catch (err) {
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">💬 Ask AI</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about your spending, goals, or how to save..."
        className="w-full p-4 border border-gray-300 rounded mb-4"
        rows={4}
      />

      <button
        onClick={handleAsk}
        // className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        className={`px-6 py-2 rounded transition ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <p className="font-semibold mb-2">AI Response:</p>
          <p>{response}</p>
          
        </div>
      )}
    </div>
  );
}

export default AskAI;
