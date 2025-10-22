import { useState } from "react";

export default function AddEventForm() {
  const [form, setForm] = useState({
    date: "",
    time: "",
    sport: "",
    teams: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Event:", form);
    alert("Event added (in-memory only)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {["date", "time", "sport", "teams"].map((field) => (
        <div key={field}>
          <label className="block capitalize mb-1">{field}</label>
          <input
            type={field === "date" || field === "time" ? field : "text"}
            name={field}
            value={form[field]}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Event
      </button>
    </form>
  );
}