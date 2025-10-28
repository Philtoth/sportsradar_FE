import Calendar from "../components/Calendar";
import { useDataContext } from "../context/DataContext"; // Import the context
import {motion} from "framer-motion";
const CalendarPage = () => {
    const { data } = useDataContext(); // Access the context data
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Calendar sportEvents={data} /> {/* Pass the data to Calendar */}
        </motion.div>
    );
};

export default CalendarPage;