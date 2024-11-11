"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css';

const LoginButton: React.FC = () => {
  const router = useRouter();
  
  const handleUserClick = () => {
  router.push('/profile'); // Change this to your user profile page route
};

  return (
    <button onClick={handleUserClick} className={styles.loginButton}>Log in</button>
  );
};

export default LoginButton;
