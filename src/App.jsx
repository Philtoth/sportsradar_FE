import './App.css'
import { Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import CalendarPage from "./pages/CalendarPage";
import AddEventPage from "./pages/AddEventPage";
import EventDetailPage from "./pages/EventDetailPage";

export default function App() {

  // render main
  return (
    <div className="w-full min-h-screen text-center bg-blue-300">
    <Navbar></Navbar>      
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
