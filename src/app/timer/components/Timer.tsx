"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Timer.module.css";

const Timer = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState("none"); // Default to "None"
    const audioRef = useRef<HTMLAudioElement | null>(null); // Ref to manage audio playback

    const formatNumber = (num: number) => String(num).padStart(2, "0");

    const playSound = (track: string) => {
        if (audioRef.current) {
            audioRef.current.pause(); // Stop any currently playing audio
            audioRef.current.currentTime = 0; // Reset the playback to the beginning
        }

        if (track !== "none") {
            const audio = new Audio(track);
            audioRef.current = audio; // Assign the new audio to the ref
            audio
                .play()
                .then(() => {
                    console.log(`Playing: ${track}`);
                })
                .catch((error) => {
                    console.error("Sound failed:", error);
                });
        }
    };

    useEffect(() => {
        let interval: number | null = null;

        if (isRunning) {
            interval = window.setInterval(() => {
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    setIsRunning(false);
                    playSound("/sounds/sad-meow-song.mp3"); // Always play "Sad Meow" on timer end
                    if (interval !== null) clearInterval(interval);
                } else if (seconds > 0) {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                } else if (minutes > 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    setSeconds(59);
                } else if (hours > 0) {
                    setHours((prevHours) => prevHours - 1);
                    setMinutes(59);
                    setSeconds(59);
                }
            }, 1000);
        }

        return () => {
            if (interval !== null) clearInterval(interval);
        };
    }, [isRunning, hours, minutes, seconds]);

    const setPresetTime = (preset: String) => {
        setIsRunning(false);
        switch (preset) {
            case "base":
                setHours(0);
                setMinutes(0);
                setSeconds(0);
                break;
            case "25min":
                setHours(0);
                setMinutes(25);
                setSeconds(0);
                break;
            case "5min":
                setHours(0);
                setMinutes(5);
                setSeconds(0);
                break;
            case "10min":
                setHours(0);
                setMinutes(10);
                setSeconds(0);
                break;
            default:
                break;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, unit: "hours" | "minutes" | "seconds") => {
        const value = Math.max(0, parseInt(e.currentTarget.value) || 0);
        if (unit === "hours") setHours(value);
        if (unit === "minutes") setMinutes(value);
        if (unit === "seconds") setSeconds(value);
    };

    const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTrack = e.target.value;
        setSelectedTrack(newTrack);
        playSound(newTrack); // Play the selected track immediately
    };

    return (
        <div className={styles.timer}>
            <div className={styles.timeSelectionCard}>
                <div className={styles.timeSelection}>
                    <button onClick={() => setPresetTime("25min")}>Pomodoro</button>
                    <button onClick={() => setPresetTime("5min")}>Short Break</button>
                    <button onClick={() => setPresetTime("10min")}>Long Break</button>
                </div>
            </div>

            <div className={styles.timeDisplay}>
                <input
                    type="number"
                    value={hours > 0 ? formatNumber(hours) : "00"}
                    onChange={(e) => handleInputChange(e, "hours")}
                    min="0"
                    className={styles.inputField}
                />
                <span>:</span>
                <input
                    type="number"
                    value={minutes > 0 ? formatNumber(minutes) : "00"}
                    onChange={(e) => handleInputChange(e, "minutes")}
                    min="0"
                    className={styles.inputField}
                />
                <span>:</span>
                <input
                    type="number"
                    value={seconds > 0 ? formatNumber(seconds) : "00"}
                    onChange={(e) => handleInputChange(e, "seconds")}
                    min="0"
                    className={styles.inputField}
                />
            </div>

            <div className={styles.controlcard}>
                <div className={styles.control}>
                    <button onClick={() => setIsRunning(true)}>Start</button>
                    <button onClick={() => setIsRunning(false)}>Stop</button>
                    <button onClick={() => setPresetTime("base")}>Reset</button>
                </div>
            </div>

            {/* Dropdown for selecting music positioned at the bottom-right */}
            <div className={styles.musicDropdownContainer}>
                <select
                    className={styles.musicDropdown}
                    onChange={handleTrackChange}
                    value={selectedTrack}
                >
                    <option value="none">None</option>
                    <option value="/sounds/study.mp3">Study</option>
                    <option value="/sounds/relax.mp3">Relaxing</option>
                    <option value="/sounds/Lofi.mp3">LoFi</option>
                    <option value="/sounds/calm.mp3">Calm</option>
                    <option value="/sounds/dreamy.mp3">Dreamy</option>
                    <option value="/sounds/piano.mp3">Piano</option>
                </select>
            </div>
        </div>
    );
};

export default Timer;
