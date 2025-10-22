import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
export default function CalendarPage() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch("/events.json")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error("Error loading events:", err));
    }, []);
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Sports Event Calendar</h2>
            <Calendar events={events} />
        </div>
    );
}