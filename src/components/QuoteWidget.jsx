import { useEffect, useState } from "react";

const API_BASE = "https://quote-api-sldq.onrender.com/api";

function QuoteWidget() {
  const [quote, setQuote] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [usr, setUsr] = useState("");
  const [status, setStatus] = useState(null);
  const [isUsrAnonymus, setIsUsrAnonymus] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const fetchQuote = async () => {
    try {
      const res = await fetch(`${API_BASE}/quote/random`);
      const data = await res.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote", error);
    }
  };

  const sendFeedback = async () => {
    try {
      if (!feedback.trim()) {
        setStatus({ type: "error", message: "The feedback can't be empty" });
        return;
      }

      const res = await fetch(`${API_BASE}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usr: !isUsrAnonymus ? usr : "Anonymous",
          message: feedback,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setStatus({ type: "error", message: errorData.message });
        return;
      }

      setStatus({ type: "success", message: "Thanks for your feedback!" });
      setFeedback("");
    } catch (error) {
      setStatus({ type: "error", message: "Oops! Something went wrong." });
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      className="relative bg-mountain bg-cover bg-center bg-no-repeat bg-fixed w-full min-h-screen overflow-hidden"
    >
      {/* Contenedor que mueve el contenido con la cita hacia arriba */}
      <div
        className={`min-h-screen w-full transition-transform duration-700 ease-in-out`}
        style={{
          transform: showFeedbackForm ? "translateY(-100vh)" : "translateY(0)",
        }}
      >
        <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center max-w-3xl mx-auto text-white">
          {quote ? (
            <>
              <p className="text-3xl italic drop-shadow-lg max-w-xl font-merriweather">
                "{quote.message}"
              </p>
              <p className="mt-4 text-xl drop-shadow-lg">- {quote.author}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
  
  
          <button
            onClick={fetchQuote}
            title="Get more quote"
            className="mt-10 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            aria-label="Get more quote"
          >
             Get Quote
          </button>
          
  
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2  text-white rounded-full shadow-md hover:bg-gray-800 transition z-40"
          >
            Give Feedback
          </button>

        </div>
      </div>
  
      <div
        className={`fixed top-0 left-0 w-full h-screen text-white flex justify-center items-center px-4 transform transition-transform duration-700 ease-in-out z-50 ${
          showFeedbackForm ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          backdropFilter: "blur(8px)", 
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <div className="max-w-md w-full rounded-lg p-6 shadow-lg bg-black bg-opacity-80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Send your feedback</h2>
            <button
              onClick={() => {
                setShowFeedbackForm(false);
                setStatus(null);
              }}
              className="text-sm text-red-400 underline hover:text-red-600"
            >
              Cancel
            </button>
          </div>
  
          {status && (
            <p
              className={`mb-2 text-sm ${
                status.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {status.message}
            </p>
          )}
  
          <div className="space-y-2">
            <button
              onClick={() => {
                setIsUsrAnonymus((prev) => !prev);
                setUsr("");
              }}
              className="text-sm text-blue-400 underline"
            >
              {isUsrAnonymus ? "Use your name" : "Send anonymously"}
            </button>
  
            {!isUsrAnonymus && (
              <input
                type="text"
                placeholder="Your name"
                value={usr}
                onChange={(e) => setUsr(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white transition-all duration-300"
              />
            )}
            <textarea
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
              rows="3"
              placeholder="What do you think about this phrase?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
              onClick={sendFeedback}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Send feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default QuoteWidget;
