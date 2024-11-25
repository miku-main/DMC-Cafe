"use client";

import React from "react";
import { useSession } from "next-auth/react";
import NavBar from "./NavBar";
import HomeIcon from "./HomeIcon";
import HeaderMessage from "./HeaderMessage";
import CharacterIcons from "./CharacterIcons";
import MainDescription from "./MainDescription";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
    const { data: session } = useSession(); // Get session data

    return (
        <div className={styles.homePage}>
            <HomeIcon />
            <div className={styles.homePage}>
                {/* No need to pass onLogout */}
                <NavBar />
                <div className={styles.mainContent}>
                    <HeaderMessage />
                    <CharacterIcons />
                    <MainDescription />
                    {!session && (
                        <button
                            onClick={() => (window.location.href = "/login")}
                            className={styles.loginButton}
                        >
                            Log in
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;

