"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css';

const NavBar: React.FC = () => {
  const router = useRouter();

  // Navigation functions
  const handleUserClick = () => {
    router.push('/profile'); 
  };

  const handleTimerClick = () => {
    router.push('/timer'); 
  };

  const handleCalenderClick = () => {
    router.push('/calender');
  }

  return (
    <nav className={styles.navBar}>
      <button onClick={handleUserClick} className={styles.navButton}>
        <img src="/images/user-icon.png" alt="User Icon" className={styles.navIcon} />
      </button>
      <button onClick={handleTimerClick} className={styles.navButton}>
        <img src="/images/timer-icon.png" alt="Timer Icon" className={styles.navIcon} />
      </button>
      <button onClick={handleCalenderClick} className={styles.navButton}>
        <img src="/images/calendar-icon.png" alt="Calender Icon" className={styles.navIcon} />
      </button>
    </nav>
  );
};

export default NavBar;
