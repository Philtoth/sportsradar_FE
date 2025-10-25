import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import AddEventPage from "./pages/AddEventPage";
import EventDetailPage from "./pages/EventDetailPage";

export default function App() {

  // render main
  return (
    <div className="min-h-screen text-gray-800">
      <nav className="bg-blue-400 text-white py-2 rounded p-3 flex justify-between items-center shadow">
        <h1 className="text-shadow-md font-semibold">Events</h1>
        <div className="space-x-8">
          <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            <Link to="/">Calendar</Link>
            </button>
          <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            <Link to="/add/:date">Add Event</Link>
            </button>
         
        </div>
      </nav>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/add/:date" element={<AddEventPage />} />
          <Route path="/event/:sport/:homeTeam/:awayTeam/:dateVenue/:timeVenueUTC" element={<EventDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}
