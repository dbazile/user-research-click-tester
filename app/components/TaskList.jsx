import React, {Component} from 'react';
import Task from './Task';
import styles from './TaskList.css';

export default class TaskList extends Component {
  static propTypes = {
    tasks: React.PropTypes.array.isRequired,
    changed: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <ul className={styles.root}>
        {this.props.tasks.map(task =>
          <Task {...task}
                key={task.id}
                clicked={(x, y) => this._clicked({x, y, task})} />
        )}
      </ul>
    );
  }

  _clicked({task, x, y}) {
    const {changed, tasks} = this.props;
    changed(tasks.map(t => t.id === task.id ? Object.assign({}, task, {click: [x, y]}) : t));
  }
}
