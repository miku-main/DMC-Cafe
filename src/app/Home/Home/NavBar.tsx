"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css';

const NavBar: React.FC = () => {
  const router = useRouter();

  const handleUserClick = () => {
    router.push('/profile'); 
  };

  const handleTimerClick = () => {
    router.push('/timer'); 
  };

  const handleTodoClick = () => {
    router.push('/Todo');
  };

  const handleLogoutClick = () => {
    localStorage.setItem('isLoggedIn', 'false');
    router.replace('/'); // Redirect to home page
    window.location.reload(); // Force reload to reset login state across components
  };

  return (
    <nav className={styles.navBar}>
      <button onClick={handleUserClick} className={styles.navButton}>
        <img src="/images/user-icon.png" alt="User Icon" className={styles.navIcon} />
      </button>
      <button onClick={handleTimerClick} className={styles.navButton}>
        <img src="/images/timer-icon.png" alt="Timer Icon" className={styles.navIcon} />
      </button>
      <button onClick={handleTodoClick} className={styles.navButton}>
        <img src="/images/task-icon.png" alt="Task Icon" className={styles.navIcon} />
      </button>
      <button onClick={handleLogoutClick} className={`${styles.navButton} ${styles.logoutButton}`}>
        <img src="/images/exit-icon.png" alt="Exit Icon" className={styles.navIcon} />
      </button>
    </nav>
  );
};

export default NavBar;