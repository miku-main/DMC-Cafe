"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfilePage from './ProfilePage'
import styles from './ProfileCard.module.css';

const ProfileCard: React.FC = () => {
  const router = useRouter();

  const handleUserClick = () => {
    router.push('/login'); 
  };

  const handleTimerClick = () => {
    router.push('/createAccount'); 
  };

  return (
    <div className={styles.profileCard}>
      <img src="/images/user-icon.png" alt="User Icon" className={styles.profileImage} />
      <button onClick={handleUserClick} className={styles.button}>Log In</button>

      <button onClick={handleUserClick} className={styles.button}>Create An Account</button>
    </div>
  );
};

export default ProfileCard;
