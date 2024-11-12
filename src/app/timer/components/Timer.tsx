"use client"
import React from "react"
import { useRouter } from 'next/navigation';
import { useState } from "react"
import styles from "./Timer.module.css"

const Timer = () => {
    // Variables that hold hours, minutes, and seconds
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const setPresetTime = (preset: String) => {
        switch (preset) {
            case "base":
                setHours(0)
                setMinutes(0)
                setSeconds(0)
                break
            case "25min":
                setHours(0)
                setMinutes(25)
                setSeconds(0)
                break
            case "5min":
                setHours(0)
                setMinutes(5)
                setSeconds(0)
                break
            case "10min":
                setHours(0)
                setMinutes(10)
                setSeconds(0)
                break
            default:
                break
        }
    }

    return (
        <div className={styles.timer}>  
            <div className={styles.timeSelectionCard}>
                <div className={styles.timeSelection}>
                    <button onClick={() => setPresetTime("25min")}>Pomodoro</button>
                    <button onClick={() => setPresetTime("5min")}>Short Break</button>
                    <button onClick={() => setPresetTime("10min")}>Long Time</button>
                </div>
            </div>

            <div className={styles.timeDisplay}>
                <h1>
                    {String(hours).padStart(2, "0")} : {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
                </h1>
            </div>

            <div className={styles.controlcard}>
                <div className={styles.control}>
                    <button>Start</button>
                    <button onClick={() => setPresetTime("base")}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Timer
