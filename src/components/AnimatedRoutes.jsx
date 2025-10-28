import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CalendarPage from "../pages/CalendarPage";
import AddEventPage from "../pages/AddEventPage";
import EventDetailPage from "../pages/EventDetailPage";
import { AnimatePresence } from "framer-motion";

export default function AnimatedRoutes() {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route 
                    path="/" 
                    element={<CalendarPage />} 
                />
                <Route 
                    path="/add/:date" 
                    element={<AddEventPage />} 
                />
                <Route 
                    path="/event/:sport/:homeTeam/:awayTeam/:dateVenue/:timeVenueUTC" 
                    element={<EventDetailPage />} 
                />
            </Routes>
        </AnimatePresence>
    );
}