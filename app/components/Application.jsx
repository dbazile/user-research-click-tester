import React, {Component} from 'react';
import Instructions from './Instructions';
import TaskList from './TaskList';
import ThankYou from './ThankYou';
import styles from './Application.css';
import {serialize, deserialize}  from '../store';

export default class Application extends Component {
  constructor() {
    super();
    this.state = deserialize();
  }

  componentDidUpdate() {
    serialize(this.state);
  }

  render() {
    return (
      <div className={styles.root}>
        <TaskList tasks={this.state.tasks} />
      </div>
    );
  }
}

