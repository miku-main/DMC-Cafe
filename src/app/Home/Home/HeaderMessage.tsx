import React from 'react';
import styles from './HomePage.module.css';

const HeaderMessage: React.FC = () => {
  return (
    <div className={styles.headerMessage}>
      <h1>Welcome to the DMC Cafe!</h1>
    </div>
  );
};

export default HeaderMessage;
