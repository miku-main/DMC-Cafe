"use client";
import React, { useState } from 'react';
import { format, addDays, addWeeks, addMonths, startOfWeek, startOfMonth, endOfWeek, endOfMonth, eachDayOfInterval } from 'date-fns';
import styles from '../../Home/Home/HomePage.module.css';
import style from '../components/Calender.module.css';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  // A mock event list, integrate with a real API later.
  const events = [
    { date: '2024-11-26T00:00:00', title: 'Team Meeting' },
    { date: '2024-11-26T00:00:00', title: 'Exam Study' },
    { date: '2024-11-26T00:00:00', title: 'abc' },
    { date: '2024-11-27T00:00:00', title: 'Appointment' },
  ];

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

  const renderDayView = () => {
    
    const dayEvents = events.filter(event =>
      format(new Date(event.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
    );

    return (
      <div style={{ width: '1300px', height: '655px' }}> 
          <div className={style.dayViewContainer}>
            {dayEvents.length ? (
              <ul className={style.eventList}>
                {dayEvents.map((event, index) => (
                  <li key={index} className={style.eventItem} onClick={() => alert(`Event: ${event.title}`)}>
                    <strong>{event.title}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <strong className={style.noEventsMessage}>No events for today.</strong>
            )}
          </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const start = startOfWeek(currentDate);
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

    const getEventsForDay = (day: string | number | Date) =>
      events.filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));

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
                <div className={style.dateNumber}>{format(day, 'd')}</div>
                <div className={style.eventContainer}>
                  {getEventsForDay(day).map(event => (
                    <div key={event.title} className={style.weekEvent}>
                      {event.title}
                    </div>
                  ))}
                </div>
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

    const paddedDays = Array.from({ length: start.getDay() }).fill(null).concat(days);

    const getEventsForDay = (day: string | number | Date) =>
      events.filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));

    return (
      <div style={{ width: '1300px', height: '655px' }}> 
        <div className={style.monthViewContainer}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className={style.monthDayHeader}>
                    {day}
                </div>
            ))}
            {paddedDays.map((day, i) =>
                day instanceof Date ? (
                  <div key={day.toString()} className={style.monthDayCell}>
                    <div className={style.dateNumber}>{format(day, 'd')}</div>
                    <div className={style.eventContainer}>
                      {getEventsForDay(day).map(event => (
                        <div key={event.title} className={style.monthEvent}>
                          {event.title}
                        </div>
                      ))}
                    </div>
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
    <div className={style.homePage}>
      <div className={styles.mainContent}>
      <div className="flex space-x-2 mb-4">
        <button
            onClick={handleToday}
            className={`${style.calendarButton}`}>
            Today
        </button>
        <button
            onClick={() => setView('day')}
            className={`${style.calendarButton} ${view === 'day' ? styles.calendarButtonActive : ''}`}>
            Day
        </button>
        <button
            onClick={() => setView('week')}
            className={`${style.calendarButton} ${view === 'week' ? styles.calendarButtonActive : ''}`}>
            Week
        </button>
        <button
            onClick={() => setView('month')}
            className={`${style.calendarButton} ${view === 'month' ? styles.calendarButtonActive : ''}`}>
            Month
        </button>
      </div>
          {renderHeader()}
          {renderContent()}
        </div>
      </div>
  );
};

export default Calendar;
