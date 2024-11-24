import React from 'react';
import Calender from './components/Calender';
import NavBar from '../Home/Home/NavBar';
import styles from '../Home/Home/HomePage.module.css'
import HomeIcon from '../Home/Home/HomeIcon'

export default function Page() {
  return (
    <div className={styles.homePage}>
      <NavBar />
      <HomeIcon />
      <div>
        <Calender />
      </div>
    </div>
  );
}
