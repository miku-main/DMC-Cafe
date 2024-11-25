"use client";

import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import HomeIcon from "./HomeIcon";
import HeaderMessage from "./HeaderMessage";
import CharacterIcons from "./CharacterIcons";
import MainDescription from "./MainDescription";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check the login state on component mount
    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedInStatus);
    }, []);

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "false"); // Clear the logged-in status
        setIsLoggedIn(false); // Update the state
    };

    return (
        <div className={styles.homePage}>
            <HomeIcon />
            <div className={styles.homePage}>
                {/* Pass handleLogout to NavBar */}
                <NavBar onLogout={handleLogout} />
                <div className={styles.mainContent}>
                    <HeaderMessage />
                    <CharacterIcons />
                    <MainDescription />
                    {!isLoggedIn ? (
                        <button
                            onClick={() => (window.location.href = "/login")}
                            className={styles.loginButton}
                        >
                            Log in
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            Log out
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;

