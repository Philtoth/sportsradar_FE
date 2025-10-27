import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight} from 'react-icons/fa';
export default function Calendar({ sportEvents }) {
    // get savedData if available
    const navigate = useNavigate(); // used for hook
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
    let dayNames = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const rearrangeDayNames = (dayNames) => {
        return dayNames.slice(firstDayOfMonth).concat(dayNames.slice(0, firstDayOfMonth));
    }

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
    const createLink = (data ,isToday) => {
        
        return <Link
            // resets state for each month, add event details to URL
            key={checkData([data.sport, data.homeTeam?.name, data.awayTeam?.name, data.dateVenue, data.timeVenueUTC])}

            //#THOUGHTS URL shows %20%20%20 ?? but it still works fine 
            to={`/event/${data.sport}/${data.homeTeam?.name}/${data.awayTeam?.name}/${data.dateVenue}/${data.timeVenueUTC}`}

            className="block text-[10px] sm:text-xs md:text-sm hover:text-blue-600 no-underline "
        >
            {/* only show matchup if both teams are available */}
            {/* {data.homeTeam?.name && data.awayTeam?.name ? (
                `${data.homeTeam.name} vs ${data.awayTeam.name}`
            ) :
                (
                    "TBD"
                )} */}
            {/* { maybe add some icons later
                <IconContext value={{ color: 'blue', size: '24px' }}>
                    <FaCalendarCheck ></FaCalendarCheck>
                </IconContext>
            } */}
            <div className={`my-0.5 text-xs sm:text-sm md:text-base sm:my-1 font-medium ${isToday? `bg-teal-500 hover:bg-teal-700`: "bg-blue-500 hover:bg-blue-700"}
                 hover:text-white rounded-2xl hover:rounded-2xl transform transition duration-300 hover:scale-105
                 hover:cursor-pointer`}>Event</div>
        </Link>
    }


    const getStoredEvents = () => {
        const stored = [];
        for (const key of Object.keys(sessionStorage)) {
            try {
                const e = JSON.parse(sessionStorage.getItem(key));
                if (!e || !e.date) continue;

                // Normalize structure to match mock data shape
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
        const date = `${currentYear}-` + `${currentMonth + 1}-` + `${day < 10 ? "0" + day : day}`;
        // Create a proper Date object for this day
        calendarDays.push(
            <div
                key={day}
                className={`inset-shadow-sm inset-shadow-blue-300 bg-blue-400 border rounded p-1 sm:p-2 aspect-square relative ${isToday ? 'bg-teal-400 ring-2 inset-shadow-amber-400 ring-teal-400' : ''}`}
            // not allowed here
            >
                <p className={`w-6 flex justify-center text-xs sm:text-sm md:text-base font-medium bg-blue-500
                 hover:bg-blue-700 hover:text-white  hover:rounded-full transform rounded-full hover:shadow-xl transition duration-300 hover:scale-105
                 hover:cursor-pointer ${isToday ? ' bg-teal-500 hover:bg-teal-700' : ''}`}
                    onClick={() => navigate(`/add/${encodeURIComponent(date)}`)}
                >
                    {day}

                </p>
                {/* eventdetails here */}
                <div className="text-base sm:text-lg md:text-xl lg:text-1xl font-bold">
                    {dayEvents.map(e => createLink(e,isToday))}
                </div>
            </div>
        );

    }

    // render calendar
    return (
        < div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="space-y-3 sm:space-y-4">
                {/* Navigation Controls */}
                <div className="flex sm:inline-flex items-center justify-center gap-4 sm:gap-8 py-3 sm:py-4">
                    <button
                        onClick={goToPreviousMonth}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500  hover:text-white  hover:rounded-2xl transform hover:shadow-xl transition duration-300 hover:scale-105 rounded text-base sm:text-lg md:text-xl font-semibold"
                        title="Previous Month"
                    >
                        <FaArrowLeft></FaArrowLeft>
                    </button>

                    <div className="text-center min-w-[180px] sm:min-w-[220px]">
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                            {monthNames[currentMonth]} {currentYear}
                        </h2>
                    </div>

                    <button
                        onClick={goToNextMonth}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500  hover:text-white  hover:rounded-2xl transform hover:shadow-xl transition duration-300 hover:scale-105 rounded text-base sm:text-lg md:text-xl font-semibold"
                        title="Next Month"
                    >
                       <FaArrowRight></FaArrowRight>
                    </button>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {rearrangeDayNames(dayNames).map(day => (
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