import { audio } from "framer-motion/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function AddEventForm() {
  const { date } = useParams();
  const navigate = useNavigate();
  const audioSuccess = new Audio('/success.mp3');
  const audioError = new Audio('/error.mp3');
  const [info,setInfo] = useState("Add a new event!")
  const [form, setForm] = useState({
    key: window.crypto.randomUUID(),
    sport: "",
    homeTeam: "",
    awayTeam: "",
    date: date ? date : "",
    time: ""
  });

  const checkFormValues = (form) => {
  console.log(form);

  // Regex for general fields: letters, numbers, spaces, underscores, dashes
  const validPattern = /^[A-Za-z0-9 _-]+$/;

  // Regex for date/time fields: allow / and :
  const dateTimePattern = /^[A-Za-z0-9 _\-\/:]+$/;

  for (const key in form) {
    // Skip the UUID 
    if (key === "key") continue;

    let value = form[key];

    // Check for empty, null, or undefined
    if (value === "" || value === null || value === undefined) {
      return false;
    }

    // Determine which pattern to use
    let pattern = validPattern;
    if (key.toLowerCase() === "date" || key.toLowerCase() === "time") {
      pattern = dateTimePattern;
    }

    // Check for invalid characters
    if (typeof value === "string" && !pattern.test(value)) {
      return false;
    }
  }

  return true;
  };

  // submit form, check and send data if success
  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkFormValues(form)) {
      audioSuccess.volume = 0.3;
      audioSuccess.play();
      sessionStorage.setItem(`${form.key}`, JSON.stringify(form));
      sessionStorage.setItem("lastViewedDate", form.date);
      navigate("/");
      return
    }
    audioError.volume = 0.3;
    audioError.play();
    setInfo("⚠️ Please check your inputs ⚠️");
  };

  // render form page
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full p-4 bg-linear-to-r from-indigo-900 to-indigo-800  rounded-xl shadow-xl sm:p-8">
        <div className="px-6 py-4">
          <div className="text-white font-bold text-xl mb-2">{info}</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          {["sport", "homeTeam", "awayTeam", "date", "time"].map((field) => (
            <div key={field}>
              <label className="block text-white text-left text-md font-semibold capitalize mb-1">{field}: </label>
              <input
                type={field === "date" || field === "time" ? field : "text"}
                name={field}
                value={form[field]}
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                onFocus={info}
                className="bg-white border p-2 w-full rounded"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:rounded-2xl transform hover:shadow-xl transition duration-300 hover:scale-105"
          >
            Add event
          </button>
        </form>
      </div>
    </div>
  );
}