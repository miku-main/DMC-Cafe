"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from "./HomePage.module.css";

const NavBar: React.FC = () => {
    const { data: session, status } = useSession(); // Get session data and status
    const router = useRouter();
    const [userIcon, setUserIcon] = useState<string>("/images/user-icon.png"); // Default user icon

    useEffect(() => {
        // Check login status and manually set the user icon to '/waffle.png'
        if (status === "authenticated") {
            setUserIcon("/waffle.png"); // Change to '/waffle.png' for logged-in users
        } else {
            setUserIcon("/images/user-icon.png"); // Default for non-logged-in users
        }
    }, [status]); // Runs whenever the session status changes

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

    const handleLogoutClick = async () => {
        await signOut({ callbackUrl: "/" }); // Log out and reload homepage
    };

    return (
        <nav className={styles.navBar}>
            <button onClick={handleUserClick} className={styles.navButton}>
                <img
                    src={userIcon} // Dynamically set user icon
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
            {session && (
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
            )}
        </nav>
    );
};

export default NavBar;
