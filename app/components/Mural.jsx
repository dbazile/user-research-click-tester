import React from 'react';
import styles from './Mural.css';

export default function Mural() {
  return (
    <svg className={styles.root} viewBox="20 0 160 300">
      <g className={styles.likeness}>
        <rect className={styles.background} x="20" y="0" width="160" height="200"></rect>
        <rect className={styles.label} x="30" y="17" width="138" height="15"></rect>
        <rect className={styles.label} x="30" y="68" width="106" height="15"></rect>
        <rect className={styles.label} x="30" y="120" width="85" height="15"></rect>
        <rect className={styles.label} x="30" y="168" width="124" height="15"></rect>
        <rect className={styles.border} x="20" y="48" width="160" height="2"></rect>
        <rect className={styles.border} x="20" y="100" width="160" height="2"></rect>
        <rect className={styles.border} x="20" y="150" width="160" height="2"></rect>
        <rect className={styles.border} x="20" y="198" width="160" height="2"></rect>
      </g>
      <g className={styles.mouse}>
        <polygon className={styles.cursor} points="75 87.4611057 85.5917838 79.4980824 95.7556398 102.033642 106.587233 96.8729868 96.4253497 75.2528632 111.666047 73.8244732 75 33"></polygon>
      </g>
    </svg>
  );
}
