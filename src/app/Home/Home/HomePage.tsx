"use client";

import React from "react";
import { useSession } from "next-auth/react";
import NavBar from "./NavBar";
import HomeIcon from "./HomeIcon";
import HeaderMessage from "./HeaderMessage";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
    const { data: session } = useSession(); // Get session data

    return (
        <div className={styles.homePage}>
            <HomeIcon />
            <div className={styles.innerContainer}>
                <NavBar />
                <div className={styles.mainContent}>
                    <HeaderMessage />
                    {!session && (
                        <div className={styles.authButtons}>
                            <button
                                onClick={() => (window.location.href = "/login")}
                                className={styles.loginButton}
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => (window.location.href = "/createAccount")}
                                className={styles.createAccountButton}
                            >
                                Create Account
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
