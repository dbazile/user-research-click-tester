import React, {Component} from 'react';
import Instructions from './Instructions';
import TaskList from './TaskList';
import ThankYou from './ThankYou';
import styles from './Application.css';
import {serialize, deserialize}  from '../utils/store';

export default class Application extends Component {
  constructor() {
    super();
    this.state = deserialize();
    this._tasksChanged = this._tasksChanged.bind(this);
  }

  componentDidUpdate() {
    serialize(this.state);
  }

  render() {
    return (
      <div className={styles.root}>
        <TaskList tasks={this.state.tasks} changed={this._tasksChanged} />
      </div>
    );
  }

  _tasksChanged(tasks) {
    this.setState({tasks});
  }
}

