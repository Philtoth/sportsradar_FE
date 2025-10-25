import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function EventDetailPage() {
    const { sport, homeTeam, awayTeam, dateVenue, timeVenueUTC } = useParams();

    // save last date visited
    useEffect(() => {
        if (dateVenue) {
            sessionStorage.setItem("lastViewedDate", dateVenue);
        }
    }, [dateVenue]);


    //render detailspage
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <p>Info: {sport}</p>
            <p>Home-Team: {homeTeam}</p>
            <p>Away-Team: {awayTeam}</p>
            <p>Date: {dateVenue}</p>
            <p>Time UTC: {timeVenueUTC}</p>
        </div>
    );
}