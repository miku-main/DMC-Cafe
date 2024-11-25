"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./HomePage.module.css";

interface NavBarProps {
    onLogout: () => void; // Accept a logout callback
}

const NavBar: React.FC<NavBarProps> = ({ onLogout }) => {
    const router = useRouter();

    const handleUserClick = () => {
        router.push("/profile");
    };

    const handleTimerClick = () => {
        router.push("/timer");
    };

    const handleCalenderClick = () => {
        router.push("/calender");
    };

    const handleTodoClick = () => {
        router.push("/Todo");
    };

    const handleLogoutClick = () => {
        onLogout(); // Call the logout handler
        router.replace("/"); // Redirect to the home page
    };

    return (
        <nav className={styles.navBar}>
            <button onClick={handleUserClick} className={styles.navButton}>
                <img
                    src="/images/user-icon.png"
                    alt="User Icon"
                    className={styles.navIcon}
                />
            </button>
            <button onClick={handleTimerClick} className={styles.navButton}>
                <img
                    src="/images/timer-icon.png"
                    alt="Timer Icon"
                    className={styles.navIcon}
                />
            </button>
            <button
                onClick={handleCalenderClick}
                className={styles.navButton}
            >
                <img
                    src="/images/calendar-icon.png"
                    alt="Calendar Icon"
                    className={styles.navIcon}
                />
            </button>
            <button onClick={handleTodoClick} className={styles.navButton}>
                <img
                    src="/images/task-icon.png"
                    alt="Task Icon"
                    className={styles.navIcon}
                />
            </button>
            <button
                onClick={handleLogoutClick}
                className={`${styles.navButton} ${styles.logoutButton}`}
            >
                <img
                    src="/images/exit-icon.png"
                    alt="Exit Icon"
                    className={styles.navIcon}
                />
            </button>
        </nav>
    );
};

export default NavBar;

