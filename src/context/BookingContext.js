'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

const SEARCH_STORAGE_KEY = 'aurora_last_search';
const SELECT_STORAGE_KEY = 'aurora_selected_flights';
const PASSENGER_STORAGE_KEY = 'aurora_passenger_info';

export function BookingProvider({ children }) {
    // 1. 搜尋條件
    const [searchParams, setSearchParams] = useState(null);
    
    // 2. 所選航班 (去/回)
    const [selectedFlights, setSelectedFlights] = useState({
        outbound: null,
        return: null,
    });

    // 3. 乘客資料與聯絡資訊
    const [passengers, setPassengers] = useState([]);
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // 初始化：從 localStorage 讀取
    useEffect(() => {
        try {
            const savedSearch = JSON.parse(localStorage.getItem(SEARCH_STORAGE_KEY));
            if (savedSearch) setSearchParams(savedSearch);

            const savedSelect = JSON.parse(localStorage.getItem(SELECT_STORAGE_KEY));
            if (savedSelect) setSelectedFlights(savedSelect);

            const savedPassengers = JSON.parse(localStorage.getItem(PASSENGER_STORAGE_KEY));
            if (savedPassengers) {
                setPassengers(savedPassengers.passengers || []);
                setContactInfo(savedPassengers.contactInfo || { name: '', email: '', phone: '' });
            }
        } catch (err) {
            console.error('初始化 BookingContext 失敗:', err);
        }
    }, []);

    // 更新搜尋並存至 localStorage
    const updateSearch = (params) => {
        setSearchParams(params);
        localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(params));
    };

    // 選取航班並存至 localStorage
    const selectFlight = (leg, flightData) => {
        const next = { ...selectedFlights, [leg]: flightData };
        setSelectedFlights(next);
        localStorage.setItem(SELECT_STORAGE_KEY, JSON.stringify(next));
    };

    // 更新乘客與聯絡資訊
    const updatePassengerInfo = (data) => {
        setPassengers(data.passengers);
        setContactInfo(data.contactInfo);
        localStorage.setItem(PASSENGER_STORAGE_KEY, JSON.stringify(data));
    };

    // 清除所有資料 (完成預訂或重置)
    const clearBooking = () => {
        setSearchParams(null);
        setSelectedFlights({ outbound: null, return: null });
        setPassengers([]);
        setContactInfo({ name: '', email: '', phone: '' });
        localStorage.removeItem(SEARCH_STORAGE_KEY);
        localStorage.removeItem(SELECT_STORAGE_KEY);
        localStorage.removeItem(PASSENGER_STORAGE_KEY);
    };

    const value = {
        searchParams,
        selectedFlights,
        passengers,
        contactInfo,
        updateSearch,
        selectFlight,
        updatePassengerInfo,
        clearBooking,
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
