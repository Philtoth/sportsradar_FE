import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Calendar({ sportEvents }) {
    // get savedData if available
    const savedDate = sessionStorage.getItem("lastViewedDate");
    const [currentDate, setCurrentDate] = useState(
        savedDate ? new Date(savedDate) : new Date()
    );
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // check if mock data is initialized already
    useEffect(() => {
        if (!sessionStorage.getItem("mockInitialized")) {
            sportEvents.data.forEach((e, i) =>
                sessionStorage.setItem(`mock-${i}`, JSON.stringify(e))
            );
            sessionStorage.setItem("mockInitialized", "true");
        }
    }, [sportEvents]);


    // Get first day of month and total days  
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // goTo dates, thanks javascript for having a 0 based month system ...
    const goToPreviousMonth = () => {
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
        setCurrentDate(new Date(currentYear, currentMonth, 1));
    };
    const goToNextMonth = () => {
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
        setCurrentDate(new Date(currentYear, currentMonth, 1));
    };
    const goToToday = () => {
        setCurrentDate(new Date());
    };
    const goToAdd = () => {
        useNavigate("/add");
    }

    // validation and link state creation
    const checkData = (data) => {
        data.forEach(value => {
            switch (value) {
                // #TODO 00:00:00 could be an error or placeholder for TBD time 
                // no one knows for now
                case value == "00:00:00":
                case value == null:
                case value == undefined:
                case value == "":
                    value = "TBD";
                    break;
                default:
                    value = value;
                    break;
            }

        });
        return data
    }

    // create link to detailspage
    const createLink = (data) => {
        return <Link
            // resets state for each month, add event details to URL
            key={checkData([data.sport, data.homeTeam?.name, data.awayTeam?.name, data.dateVenue, data.timeVenueUTC])}

            //#THOUGHTS URL shows %20%20%20 ?? but it still works fine 
            to={`/event/${data.sport}/${data.homeTeam?.name}/${data.awayTeam?.name}/${data.dateVenue}/${data.timeVenueUTC}`}

            className="block text-[10px] sm:text-xs md:text-sm text-blue-600 underline truncate"
        >
            {/* only show matchup if both teams are available */}
            {data.homeTeam?.name && data.awayTeam?.name ? (
                `${data.homeTeam.name} vs ${data.awayTeam.name}`
            ) :
                (
                    "TBD"
                )}
        </Link>
    }


    const getStoredEvents = () => {
        const stored = [];
        for (const key of Object.keys(sessionStorage)) {
            try {
                const e = JSON.parse(sessionStorage.getItem(key));
                if (!e || !e.date) continue;

                // 🧠 Normalize structure to match mock data shape
                stored.push({
                    sport: e.sport,
                    homeTeam: { name: e.homeTeam },
                    awayTeam: { name: e.awayTeam },
                    dateVenue: e.date,
                    timeVenueUTC: e.time
                });
            } catch {
                // skip bad entries
            }
        }
        return stored;
    };

    // Merge mock + normalized stored events safely
    const allEvents = [
        ...sportEvents.data,
        ...getStoredEvents()
            // optional deduplication logic
            .filter(
                (stored, index, self) =>
                    index ===
                    self.findIndex(
                        (e) =>
                            e.sport === stored.sport &&
                            e.homeTeam.name === stored.homeTeam.name &&
                            e.awayTeam.name === stored.awayTeam.name &&
                            e.dateVenue === stored.dateVenue
                    )
            )
    ];




    // Create array of day cells including empty cells for alignment
    const calendarDays = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="border p-1 sm:p-2 aspect-square rounded"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = allEvents.filter(e => {
            const eventDate = new Date(e.dateVenue);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentMonth &&
                eventDate.getFullYear() === currentYear;
        });

        const isToday = new Date().getDate() === day &&
            new Date().getMonth() === currentMonth &&
            new Date().getFullYear() === currentYear;

        calendarDays.push(
            <div onClick={goToAdd(new Date(day,))}
                key={day}
                className={`border p-1 sm:p-2 aspect-square relative bg-white hover:bg-red-400 rounded ${isToday ? 'ring-2 ring-blue-500' : ''
                    }`}
            >
                <p className={`text-xs sm:text-sm md:text-base font-medium ${isToday ? 'text-blue-600 font-bold' : ''}`}>
                    {day}
                </p>
                <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1">

                    {
                        dayEvents.map(e => (createLink(e)))
                    }

                </div>
            </div>
        );

    }

    // render calendar
    return (
        < div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="space-y-3 sm:space-y-4">
                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-4 sm:gap-8 py-3 sm:py-4">
                    <button
                        onClick={goToPreviousMonth}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded text-base sm:text-lg md:text-xl font-semibold"
                        title="Previous Month"
                    >
                        ‹
                    </button>

                    <div className="text-center min-w-[180px] sm:min-w-[220px]">
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                            {monthNames[currentMonth]} {currentYear}
                        </h2>
                        <button
                            onClick={goToToday}
                            className="sm:text-lg md:text-xl lg:text-2xl text-blue-600 hover:bg-blue-100 rounded px-2 py-0.5"
                        >
                            Today
                        </button>
                    </div>

                    <button
                        onClick={goToNextMonth}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded text-base sm:text-lg md:text-xl font-semibold"
                        title="Next Month"
                    >
                        ›
                    </button>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="text-center font-semibold text-gray-700 py-1 sm:py-2 text-xs sm:text-sm md:text-base">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {calendarDays}
                </div>
            </div>
        </div>
    );
}