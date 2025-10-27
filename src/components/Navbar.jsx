import { FaCalendar, FaPlusCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="mx-auto w-full bg-blue-200 py-2 px-3 inline-flex justify-start items-center space-x-2 shadow">
            <div className="flex items-center space-x-2 mx-0.5">
                <p className='px-2 py-2'>
                    <img
                        src="/Sportradar-Brand-Line_Color_Black.svg"
                        alt="Sportradar Logo"
                        style={{ width: "200px", height: "auto" }}
                    />
                </p>
            </div>
            <Link to={"/"}>
                <div className="flex items-center space-x-2 mx-0.5 hover:text-white  transform transition duration-300 hover:scale-105">
                    <FaCalendar className="mx-0.5" size={24} />
                    <p className='text-sm md:text-xl font-bold hover:text-white text-shadow-md px-2 py-2'>
                        Calendar
                    </p>
                </div>
            </Link>
            <Link to="/add/:date">
                <div className="flex items-center space-x-2 mx-0.5  hover:text-white transform transition duration-300 hover:scale-105">
                    <FaPlusCircle className=" mx-0.5" size={24} />
                    <p className='text-sm md:text-xl font-bold text-shadow-md px-2 py-2'>
                        Add event
                    </p>
                </div>
            </Link>
        </nav>
    )
}