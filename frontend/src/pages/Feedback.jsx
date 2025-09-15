import React, { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");

  useEffect(() => {
    // Fetch existing feedbacks
    axios.get("/feedback").then((res) => {
      setFeedbacks(res.data);
    });
  }, []);

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    const res = await axios.post("/feedback", { text: newFeedback });
    setFeedbacks([...feedbacks, res.data]);
    setNewFeedback("");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Feedback</h1>

      <form onSubmit={submitFeedback} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter feedback..."
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {feedbacks.map((f) => (
            <li key={f._id}>{f.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
