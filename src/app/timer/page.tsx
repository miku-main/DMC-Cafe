import React from 'react';
import Timer from './components/Timer';
import NavBar from '../Home/Home/NavBar';
import styles from '../Home/Home/HomePage.module.css'

export default function Page() {
  return (
    <>
      <div className={styles.homePage}>
        <NavBar />
        <div>
          <Timer />
        </div>
      </div>
    </>
  );
}
