import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function AddEventForm() {
  const { date } = useParams();
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
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full p-4 bg-blue-200 rounded-xl shadow-lg sm:p-8">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Add a new event!</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          {["sport", "homeTeam", "awayTeam", "date", "time"].map((field) => (
            <div key={field}>
              <label className="block text-left text-md font-semibold capitalize mb-1">{field}: </label>
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:rounded-2xl transform hover:shadow-xl transition duration-300 hover:scale-105"
          >
            Add event
          </button>
        </form>
      </div>
    </div>
  );
}