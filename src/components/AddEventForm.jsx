import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
export default function AddEventForm() {
  const { date} = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    key: window.crypto.randomUUID(),
    sport: "",
    homeTeam: "",
    awayTeam: "",
    date: date ? date : "",
    time: ""
  });

  // submit form, set added date to lastviewed to get calendar dynamic
  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem(`${form.key}`, JSON.stringify(form));
    sessionStorage.setItem("lastViewedDate", form.date);
    navigate("/");
  };

  // render form page
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {["sport", "homeTeam", "awayTeam", "date", "time"].map((field) => (
        <div key={field}>
          <label className="block capitalize mb-1">{field}</label>
          <input
            type={field === "date" || field === "time" ? field : "text"}
            name={field}
            value={form[field]}
            onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
            required
            className="border p-2 w-full rounded"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Event
      </button>
    </form>
  );
}