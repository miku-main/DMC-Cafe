"use client";
import React, { useState } from 'react';
import { format, addDays, addWeeks, addMonths, startOfWeek, startOfMonth, endOfWeek, endOfMonth, eachDayOfInterval } from 'date-fns';
import styles from '../../Home/Home/HomePage.module.css';
import style from '../components/Calender.module.css';
import { skip } from 'node:test';


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
    <div className={style.headerContainer}>
        <button onClick={handlePrev} className={style.headerButton}>
            &lt;
        </button>
        <div className={style.headerTitleContainer}>
            <div className={style.headerTitle}>
                {view === 'day' && format(currentDate, 'MMMM d, yyyy')}
                {view === 'week' &&
                    `${format(startOfWeek(currentDate), 'MM/dd')} - ${format(
                        endOfWeek(currentDate),
                        'MM/dd'
                    )}`}
                {view === 'month' && format(currentDate, 'MMMM yyyy')}
            </div>
        </div>
        <button onClick={handleNext} className={style.headerButton}>
            &gt;
        </button>
    </div>
  );

  const renderDayView = () => (
    <div style={{ width: '1300px', height: '655px' }}> 
        <div className={style.dayViewContainer}>
            {Array.from({ length: 16 }, (_, i) => (
                <div key={i} className={style.dayHourRow}>
                    {i % 12 === 0 ? 12 : i % 12}:00 {i < 12 ? 'AM' : 'PM'}
                </div>
            ))}
        </div>
    </div>
  );

  const renderWeekView = () => {
    const start = startOfWeek(currentDate);
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

    return (
      <div style={{ width: '1300px', height: '655px' }}> 
        <div className={style.weekViewContainer}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className={style.weekDayHeader}>
                    {day}
                </div>
            ))}
            {days.map(day => (
                <div key={day.toString()} className={style.weekDayCell}>
                </div>
            ))}
        </div>
      </div>
    );
  };
  
  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    // Add padding for days before the first day of the month
    const paddedDays = Array.from({ length: start.getDay() }).fill(null).concat(days);

    return (
      <div style={{ width: '1300px', height: '655px' }}> 
        <div className={style.monthViewContainer}>
            {/* Header Row: Days of the Week */}
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className={style.monthDayHeader}>
                    {day}
                </div>
            ))}
            {/* Calendar Grid: Dates */}
            {paddedDays.map((day, i) =>
                day instanceof Date ? (
                    <div key={day.toString()} className={style.monthDayCell}>
                        {format(day, 'd')}
                    </div>
                ) : (
                    <div key={i} className={style.emptyCell}></div>
                )
            )}
        </div>
      </div>
    );
  };


  const renderContent = () => {
    if (view === 'day') 
      return renderDayView();
    if (view === 'week') return renderWeekView();
    return renderMonthView();
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.mainContent}>
      <div className={`${styles.mainContent} rounded-lg p-6 shadow-lg`}>
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
