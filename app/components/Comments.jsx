import React, {Component} from 'react';
import CommentsMural from './CommentsMural';
import styles from './Comments.css';

export default class Comments extends Component {
  render() {
    return (
      <section className={styles.root}>
        <div className={styles.container}>
          <CommentsMural className={styles.mural}/>
          <h1 className={styles.heading}>Comments?</h1>
          <textarea placeholder="Add them here!" maxLength="8192"></textarea>
          <h2 className={styles.instructions}>Scroll down to complete the testing!</h2>
        </div>
      </section>
    );
  }
}
