import React, {Component} from 'react';
import CommentsMural from './CommentsMural';
import styles from './Comments.css';

export default class Comments extends Component {
  static propTypes = {
    changed: React.PropTypes.func,
    comments: React.PropTypes.string.isRequired
  };

  constructor() {
    super();
    this._changed = this._changed.bind(this);
  }

  componentDidMount() {
    this.refs.textbox.value = this.props.comments;
  }

  render() {
    return (
      <section className={styles.root}>
        <div className={styles.container}>
          <CommentsMural className={styles.mural}/>
          <h1 className={styles.heading}>Comments?</h1>
          <textarea ref="textbox" placeholder="Add them here!" maxLength="8192" onChange={this._changed}/>
          <h2 className={styles.instructions}>Scroll down to complete the testing!</h2>
        </div>
      </section>
    );
  }

  _changed() {
    this.props.changed(this.refs.textbox.value);
  }
}
