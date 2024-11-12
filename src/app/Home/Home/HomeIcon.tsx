"use client"; // Add this line at the top

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css';

const HomeIcon: React.FC = () => {
  const router = useRouter();

  // Navigation functions
  const handleUserClick = () => {
    router.push('/'); 
  };

  return (
    <button onClick={handleUserClick} className={styles.homeButton}>
        <img src="/images/home-icon.png" alt="Home Icon" className={styles.homeIcon} />
    </button>
  );
};

export default HomeIcon;