import React, {Component} from 'react';
import ThankYouMural from './ThankYouMural';
import styles from './ThankYou.css';

export default class ThankYou extends Component {
  render() {
    return (
      <section className={styles.root}>
        <div className={styles.column}>
          <ThankYouMural className={styles.mural}/>
        </div>
        <div className={styles.column}>
          <h1 className={styles.heading}>Thank You!</h1>
          <p>I quite literally could not have done this without your help.</p>
          <p>...Uhh, could you please let me know that you're done? :)</p>
          <button className={styles.transmit}>Click here to transmit results</button>
        </div>
      </section>
    );
  }
}
