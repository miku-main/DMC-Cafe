"use client";
import React, { useState, useEffect } from "react";
import styles from "./Timer.module.css";


const Timer = () => {
   const [hours, setHours] = useState(0);
   const [minutes, setMinutes] = useState(5);
   const [seconds, setSeconds] = useState(0);
   const [isRunning, setIsRunning] = useState(false);


   useEffect(() => {
       let interval: number | null = null;
  
       if (isRunning) {
           interval = window.setInterval(() => {
               setSeconds((prevSeconds) => {
                   if (prevSeconds > 0) {
                       return prevSeconds - 1;
                   } else if (minutes > 0) {
                       setMinutes((prevMinutes) => prevMinutes - 1);
                       return 59; 
                   } else if (hours > 0) {
                       setHours((prevHours) => prevHours - 1);
                       setMinutes(59);
                       return 59;
                   } else {
                       if (interval !== null) clearInterval(interval);
                       return 0;
                   }
               });
           }, 1000);
       }
  
       return () => {
           if (interval !== null) clearInterval(interval as number); 
       };
   }, [isRunning, minutes, hours]); 
  
  


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
               <h1>
                   {String(hours).padStart(2, "0")} : {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
               </h1>
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