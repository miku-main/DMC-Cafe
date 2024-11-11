import React from 'react';
import styles from './HomePage.module.css';

const MainDescription: React.FC = () => {
  return (
    <div className={styles.mainDescription}>
      <p>
        DMC Cafe is a simple tool that helps you stay organized by keeping track of your tasks and deadlines. It lets you prioritize with a time management matrix, get reminders for upcoming due dates, and easily check off what’s done. With a built-in calendar, timer, and clock, DMC makes it easy to stay on top of your schedule.
      </p>
    </div>
  );
};

export default MainDescription;
