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

    const checkDetails = (detail) => {
        return detail === "undefined" ? detail = "TBD" : detail;
    }

    //render detailspage
    return (
        <div className="flex items-center justify-center p-4">
            <div className="p-4 max-w-md w-full bg-blue-200 rounded-xl shadow-lg sm:p-8">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{checkDetails(homeTeam)} vs {checkDetails(awayTeam)}</div>
                    <div>
                        <div className="px-4 sm:px-0">
                        </div>
                        <div className="mt-6 border-t border-blue-400 justify-center">
                            <dl className="divide-y divide-blue-400">
                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:py-6">
                                    <dt className="text-sm/6 font-bold text-gray-900 sm:">Sport:</dt>
                                    <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 font-semibold">{checkDetails(sport)}</dd>
                                </div>
                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:py-6">
                                    <dt className="text-sm/6 font-bold text-gray-900">Home-Team:</dt>
                                    <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 font-semibold">{checkDetails(homeTeam)}</dd>
                                </div>
                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:py-6">
                                    <dt className="text-sm/6 font-bold text-gray-900">Away-Team:</dt>
                                    <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 font-semibold">{checkDetails(awayTeam)}</dd>
                                </div>
                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:py-6">
                                    <dt className="text-sm/6 font-bold text-gray-900">Date:</dt>
                                    <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 font-semibold">{checkDetails(dateVenue)}</dd>
                                </div>
                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 sm:py-6 border-b border-blue-400">
                                    <dt className="text-sm/6 font-bold text-gray-900">Time:</dt>
                                    <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 font-semibold">{checkDetails(timeVenueUTC)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{checkDetails(sport)}</span>
                    <span className="inline-block bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{checkDetails(dateVenue)}</span>
                    <span className="inline-block bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{checkDetails(homeTeam)}</span>
                </div>
            </div>
        </div>

    );
}