import Calendar from "../components/Calendar";
import { mockData } from "../../public/events.js";
const sportEvents = mockData;
export default function CalendarPage() {

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Sports Event Calendar</h2>
            <Calendar sportEvents={sportEvents} />
        </div>
    );
}