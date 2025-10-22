import { useParams } from "react-router-dom";
export default function EventDetailPage() {
    const { id } = useParams();
    // You’ll later fetch or find event by ID here
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <p>Event ID: {id}</p>
            {/* Add full event details here */}
        </div>
    );
}