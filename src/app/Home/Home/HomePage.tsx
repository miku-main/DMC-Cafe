"use client";

import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import HomeIcon from './HomeIcon';
import HeaderMessage from './HeaderMessage';
import CharacterIcons from './CharacterIcons';
import MainDescription from './MainDescription';
import LoginButton from './LoginButton';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, [isLoggedIn]); // Add isLoggedIn as a dependency to update on login/logout

    return (
        <div className={styles.homePage}>
            <HomeIcon />
            <div className={styles.homePage}>
                <NavBar />
                <div className={styles.mainContent}>
                    <HeaderMessage />
                    <CharacterIcons />
                    <MainDescription />
                    {/* Conditionally render LoginButton only if not logged in */}
                    {!isLoggedIn && <LoginButton />}
                </div>
            </div>
        </div>
    );
};

export default HomePage;