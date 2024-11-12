"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css';

const LoginButton: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLoginClick = () => {
    router.push('/login'); // Redirect to the login page
  };

  return !isLoggedIn ? (
    <button onClick={handleLoginClick} className={styles.loginButton}>
      Log in
    </button>
  ) : null; // Hide the login button if already logged in
};

export default LoginButton;