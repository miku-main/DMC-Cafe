import React from 'react';
import styles from './HomePage.module.css';

const HeaderMessage: React.FC = () => {
  return (
    <div className={styles.headerMessage}>
      <h1>Welcome to the DMC Cafe!</h1>
      <p>Our goal is to help make tasks fun while being:</p>
      <p>Demure</p>
      <p>Mindful</p>
      <p>Considerate</p>
      <p>And let you enjoy the rest of your day!</p>
    </div>
  );
};

export default HeaderMessage;
