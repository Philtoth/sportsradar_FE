import { createContext, useContext, useState } from 'react';
import { mockData as sportEvents } from "../../public/events.js";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        events: sportEvents,
        filter: ""
    });

    const contextValue = {
        data,
        setData,
        updateEvents: (newEvents) => {
            setData(prev => ({
                ...prev,
                events: newEvents,
                filter: ""
            }))
        }
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};