import { useDataContext } from '../context/DataContext';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

export default function Calendar() {
    const audio = new Audio('/pageTurning.mp3');
    const [direction, setDirection] = useState('next');
    const { data } = useDataContext();
    const sportEvents = data.events.data;

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
            sportEvents.forEach((e, i) =>
                sessionStorage.setItem(`mock-${i}`, JSON.stringify(e))
            );
            sessionStorage.setItem("mockInitialized", "true");
        }
    }, [sportEvents]);


    // Get first day of month and total days  
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let dayNames = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const turn = () => {
        audio.volume = 0.3;
        audio.play();
    }

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
        turn();
        setDirection('prev');
        setCurrentDate(new Date(currentYear, currentMonth, 1));
    };
    const goToNextMonth = () => {
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
        turn();
        setDirection('next');
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
    const createLink = (data, isToday) => {

        return <Link
            // resets state for each month, add event details to URL
            key={checkData([data.sport, data.homeTeam?.name, data.awayTeam?.name, data.dateVenue, data.timeVenueUTC])}

            //#THOUGHTS URL shows %20%20%20 ?? but it still works fine 
            to={`/event/${data.sport}/${data.homeTeam?.name}/${data.awayTeam?.name}/${data.dateVenue}/${data.timeVenueUTC}`}

            className="block text-[10px] sm:text-xs md:text-sm hover:text-indigo-600 no-underline "
        >
            <div className={`my-0.5 text-xs sm:text-sm md:text-base sm:my-1 font-medium ${isToday ? `bg-red-600 hover:bg-red-700` : "bg-indigo-600 hover:bg-indigo-700"}
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
        ...sportEvents,
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

    // Build calendar data structure so we can filter by URI easily
    const calendarData = [];
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

        calendarData.push({
            day,
            isToday,
            date,
            events: dayEvents
        });
    }

    // Filter calendar data by a substring contained in the event detail URI
    const filterCalendarDataByUri = (filter, gridCells) => {
        if (!filter) return gridCells;
        const f = filter.toString().toLowerCase().trim();
        return gridCells.map(cell => {
            if (cell.placeholder) return cell;
            // keep day/date/isToday and only replace events array
            const matchedEvents = (cell.events || []).filter(e => {
                const uri = `/event/${e.sport}/${e.homeTeam?.name}/${e.awayTeam?.name}/${e.dateVenue}/${e.timeVenueUTC}`;
                try {
                    return decodeURIComponent(uri).toLowerCase().includes(f) || uri.toLowerCase().includes(f);
                } catch {
                    return uri.toLowerCase().includes(f);
                }
            });
            return {
                ...cell,                 // preserves day, date, isToday
                events: matchedEvents    // only update events
            };
        });
    };

    // render helper to map a day object to JSX
    const renderDay = (dayObj) => {
        return (
            <div
                key={dayObj.day}
                className={`inset-shadow-sm inset-shadow-indigo-300 bg-indigo-400 border rounded p-1 sm:p-2 aspect-square relative ${dayObj.isToday ? 'bg-red-400 ring-2 inset-shadow-red-500 ring-red-500' : ''}`}
            >
                <p className={`w-6 flex justify-center text-xs sm:text-sm md:text-base font-medium bg-indigo-500
                    hover:bg-indigo-700 hover:text-white  hover:rounded-full transform rounded-full hover:shadow-xl transition duration-300 hover:scale-105
                    hover:cursor-pointer ${dayObj.isToday ? ' bg-red-600 hover:bg-red-700' : ''}`}
                    onClick={() => navigate(`/add/${encodeURIComponent(dayObj.date)}`)}
                >
                    {dayObj.day}

                </p>
                <div className="text-base sm:text-lg md:text-xl lg:text-1xl font-bold">
                    {dayObj.events.map(e => createLink(e, dayObj.isToday))}
                </div>
            </div>
        );
    };

    // choose which calendar events to render based on data.filter (if present)
    const daysToRender = data.filter && data.filter !== ""
        ? filterCalendarDataByUri(data.filter, calendarData).map(renderDay)
        : calendarData.map(renderDay);

    // render calendar
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentDate.toString()} // Important: key triggers animation
                initial={{ x: direction === 'next' ? 5 : 5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="space-y-3 sm:space-y-4">
                        {/* Navigation Controls */}
                        <div className="flex sm:inline-flex items-center justify-center gap-4 py-2 sm:gap-8 sm:py-3">
                            <button
                                onClick={goToPreviousMonth}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-500  hover:text-white  hover:rounded-2xl transform hover:shadow-xl transition duration-300 hover:scale-105 rounded text-base sm:text-lg md:text-xl font-semibold"
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
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-500  hover:text-white  hover:rounded-2xl transform hover:shadow-xl transition duration-300 hover:scale-105 rounded text-base sm:text-lg md:text-xl font-semibold"
                                title="Next Month"
                            >
                                <FaArrowRight></FaArrowRight>
                            </button>
                        </div>

                        {/* Weekday Headers */}
                        <div className="grid grid-cols-7 gap-1 sm:gap-2">
                            {rearrangeDayNames(dayNames).map(day => (
                                <div key={day} className="text-center font-semibold text-white py-1 sm:py-2 text-xs sm:text-sm md:text-base">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 sm:gap-2">
                            {daysToRender}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}