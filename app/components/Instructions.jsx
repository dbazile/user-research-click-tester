import React, {Component} from 'react';
import Mural from './Mural';
import styles from './Instructions.css';

export default class Instructions extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.mural}>
          <Mural/>
        </div>
        <div className={styles.content}>
          <h1 className={styles.heading}>First-Click Testing</h1>
          <h2 className={styles.heading}>Instructions</h2>
          <p>Click the area of the interface that will let you accomplish each task.  It's that simple!</p>
          <h3 className={styles.heading}>A few things to remember...</h3>
          <ol>
            <li>You only need to click the interface once.</li>
            <li>Don't worry about making mistakes.  We're testing the interfaces, <em>not you</em>!</li>
          </ol>
          <h3 className={styles.begin}>Scroll down to begin!</h3>
        </div>
      </div>
    );
  }
}
