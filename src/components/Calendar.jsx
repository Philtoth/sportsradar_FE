
import { Link } from "react-router-dom";
export default function Calendar({ events }) {
    // Placeholder logic — later replace with dynamic month grid
    return (
        <div className="grid grid-cols-7 gap-2">
            {[...Array(30)].map((_, i) => (
                <div
                    key={i}
                    className="border p-2 h-24 relative bg-white hover:bg-gray-100 rounded"
                >
                    <p className="text-sm font-medium">{i + 1}</p>
                    {events
                        .filter(e => new Date(e.date).getDate() === i + 1)
                        .map(e => (
                            <Link
                                key={e.id}
                                to={`/event/${e.id}`}
                                className="absolute bottom-1 left-1 text-xs text-blue-600 underline"
                            >
                                {e.sport}
                            </Link>
                        ))}
                </div>
            ))}
        </div>
    );
}
