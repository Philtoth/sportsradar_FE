import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {motion} from "framer-motion";
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: ["easeIn", "easeOut"] } }
        >
            <div className="flex items-center justify-center p-4">
                <div className="p-4 max-w-md w-full bg-linear-to-r from-indigo-900 to-indigo-800 rounded-xl shadow-xl sm:p-8">
                    <div className="px-6 py-4">
                        <div className="text-white font-bold text-xl mb-2">{checkDetails(homeTeam)} vs {checkDetails(awayTeam)}</div>
                        <div>
                            <div className="px-4 sm:px-0">
                            </div>
                            <div className="mt-6 border-t border-blue-400 justify-center">
                                <dl className="divide-y divide-blue-400">
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-2 sm:py-6">
                                        <dt className="text-white text-sm/6 font-bold sm:">Sport:</dt>
                                        <dd className="text-white mt-1 text-sm/6 sm:mt-0 font-semibold">{checkDetails(sport)}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-2 sm:py-6">
                                        <dt className="text-white text-sm/6 font-bold">Home-Team:</dt>
                                        <dd className="text-white mt-1 text-sm/6 sm:mt-0 font-semibold">{checkDetails(homeTeam)}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-2 sm:py-6">
                                        <dt className="text-sm/6 font-bold text-white">Away-Team:</dt>
                                        <dd className="text-white mt-1 text-sm/6 s sm:mt-0 font-semibold">{checkDetails(awayTeam)}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-2 sm:py-6">
                                        <dt className="text-sm/6 font-bold text-white">Date:</dt>
                                        <dd className="text-white mt-1 text-sm/6  sm:mt-0 font-semibold">{checkDetails(dateVenue)}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-2 sm:py-6 border-b border-blue-400">
                                        <dt className="text-sm/6 font-bold text-white">Time:</dt>
                                        <dd className="text-white mt-1 text-sm/6 sm:mt-0 font-semibold">{checkDetails(timeVenueUTC)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-red-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#{checkDetails(sport)}</span>
                        <span className="inline-block bg-red-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#{checkDetails(dateVenue)}</span>
                        <span className="inline-block bg-red-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#{checkDetails(homeTeam)}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}