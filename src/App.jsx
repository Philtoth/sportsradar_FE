import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import AddEventPage from "./pages/AddEventPage";
import EventDetailPage from "./pages/EventDetailPage";

export default function App() {


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">🏟️ Sportradar Events</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Calendar</Link>
          <Link to="/add" className="hover:underline">Add Event</Link>
        </div>
      </nav>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/add" element={<AddEventPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}
