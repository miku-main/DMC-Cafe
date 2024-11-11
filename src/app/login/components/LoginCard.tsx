// src/components/profileCard.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginCard.module.css';

const LoginCard: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    // Here you can add authentication logic
    console.log('Email:', email);
    console.log('Password:', password);
    router.push('/profile'); // Redirect to profile page after login
  };

  return (
    <div className={styles.profileCard}>
      <img src="/images/user-icon.png" alt="User Icon" className={styles.profileImage} />
      <form className={styles.form}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type here"
          className={styles.input}
        />
        
        <label htmlFor="password" className={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type here"
          className={styles.input}
        />

        <button type="button" onClick={handleLoginClick} className={styles.button}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginCard;

