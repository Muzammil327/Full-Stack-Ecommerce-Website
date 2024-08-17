import React from "react";
import styles from './style.module.css'

export default function LoaderOverlay() {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader}></div>
    </div>
  );
}
