import React, {Component} from 'react';
import Task from './Task';
import styles from './TaskList.css';

export default class TaskList extends Component {
  static propTypes = {
    tasks: React.PropTypes.array
  };

  render() {
    return (
      <ul className={styles.root}>
        {this.props.tasks.map(task => <Task key={task.name} {...task} />)}
      </ul>
    );
  }
}
