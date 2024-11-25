"use client";
import React, { useState, useEffect } from "react";
import styles from "./Timer.module.css";


const Timer = () => {
   const [hours, setHours] = useState(0);
   const [minutes, setMinutes] = useState(0);
   const [seconds, setSeconds] = useState(0);
   const [isRunning, setIsRunning] = useState(false);

   const formatNumber = (num:number) => String(num).padStart(2, "0")

   const playSound = () => {
       const audio = new Audio("/sounds/sad-meow-song.mp3")
       audio
           .play()
           .then(() => {
                console.log("Sound played")
           })
           .catch((error) => {
                console.error("Sound failed:", error)
           })
   }

   useEffect(() => {
       let interval: number | null = null;
  
       if (isRunning) {
           interval = window.setInterval(() => {
               if (hours === 0 && minutes === 0 && seconds === 0) {
                   setIsRunning(false)
                   playSound()
                   if (interval !== null) clearInterval(interval)
               } else if (seconds > 0) {
                   setSeconds((prevSeconds) => prevSeconds - 1)
               } else if (minutes > 0) {
                   setMinutes((prevMinutes) => prevMinutes - 1)
                   setSeconds(59)
               } else if (hours > 0) {
                   setHours((prevHours) => prevHours - 1)
                   setMinutes(59)
                   setSeconds(59)
               }
           }, 1000)
       }
       
       return () => {
           if (interval !== null) clearInterval(interval)
       }
   }, [isRunning, hours, minutes, seconds])

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
        const value = Math.max(0, parseInt(e.currentTarget.value) || 0)
        if (unit === "hours") setHours(value)
        if (unit === "minutes") setMinutes(value)
        if (unit === "seconds") setSeconds(value)
   }

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
       </div>
   );
};


export default Timer;