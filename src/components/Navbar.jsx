import { useState } from "react"
import { useDataContext } from "../context/DataContext"
import { FaCalendar, FaPlusCircle, FaSearch, FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { setData } = useDataContext();

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    // Update the filter in context directly with the current value
    setData(prevData => ({
      ...prevData,
      filter: searchValue
    }));
  };

  return (
    <nav className="mx-auto w-full bg-linear-to-r from-indigo-900 to-indigo-800 py-2 px-3 shadow">
      <div className="hidden md:inline-flex w-full justify-between items-center space-x-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 mx-0.5">
            <p className="px-2 py-2">
              <img
                src="/Sportradar-Brand-Line_Color_Black.svg"
                alt="Sportradar Logo"
                style={{ width: "200px", height: "auto" }}
              />
            </p>
          </div>
          <Link to={"/"}>
            <div className="flex items-center space-x-2 mx-0.5 text-white hover:text-red-500 transform transition duration-300 hover:scale-105">
              <FaCalendar className="mx-0.5" size={24} />
              <p className="text-sm md:text-xl font-bold hover:text-red text-shadow-md px-2 py-2">Calendar</p>
            </div>
          </Link>
          <Link to="/add/:date">
            <div className="flex items-center space-x-2 mx-0.5 text-white hover:text-red-500 transform transition duration-300 hover:scale-105">
              <FaPlusCircle className="mx-0.5" size={24} />
              <p className="text-sm md:text-xl font-bold text-shadow-md px-2 py-2">Add event</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input id="filter"
              type="text"
              name="search"
              onChange={handleSearch}
              placeholder="Search events..."
              className="px-3 py-1.5 pr-8 rounded-lg border text-white border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-between items-center">
          <img src="/Sportradar-Brand-Line_Color_Black.svg" alt="Sportradar Logo" className="h-8" />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-blue-300 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-3 space-y-3 pb-2">
            <Link to={"/"} onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-2 p-2 hover:bg-blue-300 rounded-lg transition">
                <FaCalendar size={20} />
                <p className="text-lg font-bold">Calendar</p>
              </div>
            </Link>
            <Link to="/add/:date" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-2 p-2 hover:bg-blue-300 rounded-lg transition">
                <FaPlusCircle size={20} />
                <p className="text-lg font-bold">Add event</p>
              </div>
            </Link>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    id="filter"
                    type="text"
                    name="search"
                    onChange={handleSearch}
                    placeholder="Search events..."
                    className="w-full px-3 py-2 pr-8 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
          </div>
        )}
      </div>
    </nav>
  )
}