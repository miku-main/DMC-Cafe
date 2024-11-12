"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { format, addDays, addWeeks, addMonths, startOfWeek, startOfMonth, endOfWeek, endOfMonth, eachDayOfInterval } from 'date-fns';
import styles from '../Home/Home/HomePage.module.css';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');

  const handlePrev = () => {
    if (view === 'day') {
      setCurrentDate(addDays(currentDate, -1));
    } else if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, -1));
    } else {
      setCurrentDate(addMonths(currentDate, -1));
    }
  };

  const handleNext = () => {
    if (view === 'day') {
      setCurrentDate(addDays(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const renderHeader = () => (
    <div className={`${styles.headerMessage} flex justify-between items-center mb-4 p-2`}>
      <button onClick={handlePrev} className="text-white text-2xl p-2">&lt;</button>
      <div className="flex items-center space-x-4">
        <div className="text-xl font-semibold text-white">
          {view === 'day' && format(currentDate, 'MMMM d, yyyy')}
          {view === 'week' && `${format(startOfWeek(currentDate), 'MM/dd')} - ${format(endOfWeek(currentDate), 'MM/dd')}`}
          {view === 'month' && format(currentDate, 'MMMM yyyy')}
        </div>
      </div>
      <button onClick={handleNext} className="text-white text-2xl p-2">&gt;</button>
    </div>
  );

  const renderDayView = () => (
    <div className="grid grid-rows-24 border rounded-md shadow overflow-hidden bg-white p-4">
      {Array.from({ length: 24 }, (_, i) => (
        <div key={i} className="border-b p-2 h-12 text-sm text-gray-800">
          {i}:00
        </div>
      ))}
    </div>
  );

  const renderWeekView = () => {
    const start = startOfWeek(currentDate);
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    
    return (
      <div className="grid grid-cols-7 gap-1 bg-white p-4 rounded-lg shadow-md">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <div key={day} className="bg-[#9B7959] text-white font-bold text-center p-2 rounded">
            {day}
          </div>
        ))}
        {days.map(day => (
          <div key={day.toString()} className="border p-4 h-24 text-sm text-gray-800">
            {format(day, 'MM/dd')}
          </div>
        ))}
      </div>
    );
  };
  
  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
    const paddedDays = Array.from({ length: start.getDay() }).fill(null).concat(days);
  
    return (
      <div className="grid grid-cols-7 gap-1 bg-white p-4 rounded-lg shadow-md">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <div key={day} className="bg-[#9B7959] text-white font-bold text-center p-2 rounded">
            {day}
          </div>
        ))}
        {paddedDays.map((day, i) => (
          <div key={i} className="border p-4 h-24 text-sm text-gray-800">
            {day instanceof Date ? format(day, 'd') : ''}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (view === 'day') return renderDayView();
    if (view === 'week') return renderWeekView();
    return renderMonthView();
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.navBar}>
        <button className={styles.navButton}>
          <img src="/images/user-icon.png" alt="User Icon" className={styles.navIcon} /> {}
        </button>
        <button className={styles.navButton}>
          <img src="/images/timer-icon.png" alt="Timer Icon" className={styles.navIcon} /> {}
        </button>
        <button className={styles.navButton}>
          <img src="/images/calendar-icon.png" alt="Calender Icon" className={styles.navIcon} /> {}
        </button>
        {}
      </div>
      <Link href="/" className="absolute top-4 right-4">
        <img src="/images/home-icon.png" alt="Home" className="w-10 h-10" />
      </Link>
      <div className={styles.mainContent}>
      <div className={`${styles.mainContent} bg-gray-100 rounded-lg p-6 shadow-lg`}>
          <div className="flex space-x-2 mb-4">
            <button onClick={handleToday} className="px-4 py-2 bg-white text-black rounded-md shadow-md hover:bg-gray-200">Today</button>
            <button onClick={() => setView('day')} className={`px-4 py-2 ${view === 'day' ? 'bg-[#7C9B70]' : 'bg-white'} text-black rounded-md shadow-md`}>Day</button>
            <button onClick={() => setView('week')} className={`px-4 py-2 ${view === 'week' ? 'bg-[#7C9B70]' : 'bg-white'} text-black rounded-md shadow-md`}>Week</button>
            <button onClick={() => setView('month')} className={`px-4 py-2 ${view === 'month' ? 'bg-[#7C9B70]' : 'bg-white'} text-black rounded-md shadow-md`}>Month</button>
          </div>
          {renderHeader()}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
