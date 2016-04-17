import React, {Component} from 'react';
import Task from './Task';
import styles from './TaskList.css';

export default class TaskList extends Component {
  static propTypes = {
    tasks: React.PropTypes.array.isRequired,
    onTaskClick: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <ul className={styles.root}>
        {this.props.tasks.map(task =>
          <Task {...task}
                key={task.id}
                onClick={(x, y) => this.props.onTaskClick({x, y, id: task.id})} />
        )}
      </ul>
    );
  }
}
